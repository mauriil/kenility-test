import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MyLogger } from 'src/utils/MyLogger';
import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/users.providers';
import { DatabaseModule } from 'src/services/db/database.module';
import { envs } from 'src/config/envs';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { expiresIn: envs.JWT_EXPIRES_IN },
    }),
    DatabaseModule,
  ],
  providers: [AuthService, JwtStrategy, MyLogger, ...usersProviders, UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
