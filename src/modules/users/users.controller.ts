import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/users.interface';
import { QueryOptions } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Users')
  @ApiOkResponse({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Partial<User>> {
    return this.usersService.retrieveUserById(id);
  }

  @ApiTags('Users')
  @ApiOkResponse({ type: CreateUserDto })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() newUserData: Partial<User>): Promise<Partial<User>> {
    return this.usersService.updateOneUser(id, newUserData);
  }

  @ApiTags('Users')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  @Get()
  async getAll(): Promise<Partial<User>[]> {
    return this.usersService.retrieveAllUsers();
  }

  @ApiTags('Users')
  @ApiOkResponse()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<Partial<User> | QueryOptions<unknown>> {
    return this.usersService.deleteOneUser(id);
  }
}
