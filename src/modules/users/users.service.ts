import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, QueryOptions } from 'mongoose';
import { User } from './interfaces/users.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async retrieveAllUsers() {
    return await this.userModel.find();
  }

  async retrieveUserById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async updateOneUser(id: string, newUserData: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, newUserData, { new: true });
  }

  async deleteOneUser(id: string): Promise<Partial<User> | QueryOptions<unknown>> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async retrieveUserByMail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createOneUser(userData: User) {
    return await this.userModel.create(userData);
  }
}
