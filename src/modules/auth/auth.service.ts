import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { UsersService } from 'src/modules/users/users.service';
import { MyLogger } from 'src/utils/MyLogger';
import { User } from '../users/interfaces/users.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: MyLogger,
  ) {}

  async signIn(loginUser: Partial<User>) {
    const user = await this.usersService.retrieveUserByMail(loginUser.email);
    if (!user) throw new HttpException('User not found', 400);

    const validPassword = await verify(user.password, loginUser.password);
    if (!validPassword) throw new ForbiddenException('Invalid credentials');

    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      name: user.name,
      id: user._id,
    };
  }

  async signUp(newUser: User) {
    const user = await this.usersService.retrieveUserByMail(newUser.email);
    if (user) throw new HttpException('Email already exists', 400);
    const newUserObject = newUser;
    newUserObject.password = await hash(newUser.password);
    const createdUser = await this.usersService.createOneUser(newUserObject);
    const payload = { username: createdUser.name, sub: createdUser._id };
    return {
      access_token: this.jwtService.sign(payload),
      name: createdUser.name,
      id: createdUser._id,
    };
  }
}
