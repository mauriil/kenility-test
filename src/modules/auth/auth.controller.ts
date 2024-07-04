import { Body, Controller, Get, HttpCode, HttpException, Post, Res, UseGuards, Headers } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { decode } from 'jsonwebtoken';
import { MyLogger } from 'src/utils/MyLogger';
import { loginUserDto } from '../users/dto/login-user.dto';
import { User, UserLogin, UserSignUp, VerifyToken } from '../users/interfaces/users.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: MyLogger,
  ) {}

  @Post('signIn')
  @HttpCode(200)
  @ApiCookieAuth('access-token')
  async signIn(@Body() loginUser: loginUserDto, @Res({ passthrough: true }) response: Response): Promise<UserLogin> {
    try {
      const token = await this.authService.signIn(loginUser as Partial<User>);
      response.cookie('access-token', token.access_token, {
        httpOnly: false,
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // expires in 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production' ? true : false,
        domain: process.env.NODE_ENV === 'production' ? 'canchas.club' : 'localhost',
      });
      return {
        name: token.name,
        id: token.id,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 422);
    }
  }

  @Post('signUp')
  @ApiCreatedResponse()
  async signUp(@Body() newUser: CreateUserDto, @Res({ passthrough: true }) response: Response): Promise<UserSignUp> {
    try {
      const token = await this.authService.signUp(newUser as User);
      response.cookie('access-token', token.access_token, {
        httpOnly: false,
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // expires in 30 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production' ? true : false,
        domain: process.env.NODE_ENV === 'production' ? 'canchas.club' : 'localhost',
      });
      return {
        name: token.name,
        id: token.id,
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 422);
    }
  }
  @Get('verifyToken')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Headers() header): Promise<VerifyToken> {
    try {
      const token = header.authorization.split(' ')[1];
      const decodedToken = decode(token);
      return {
        userName: decodedToken['username'].toString(),
        userId: decodedToken['sub'].toString(),
      };
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, 422);
    }
  }
}
