import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    maxLength: 50,
    minLength: 4,
  })
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty({ message: 'The name is required' })
  @MaxLength(50, { message: 'The name must be less than 50 characters' })
  @MinLength(4, { message: 'The name must be more than 4 characters' })
  public name: string;

  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    maxLength: 20,
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty({ message: 'The password is required' })
  @MaxLength(20, { message: 'The password must be less than 20 characters' })
  @MinLength(4, { message: 'The password must be more than 4 characters' })
  public password: string;

  @ApiProperty({
    example: 'user@domain.com',
    description: 'The email of the user',
  })
  @IsEmail({}, { message: 'The email must be a valid email address' })
  @IsString({ message: 'The email must be a string' })
  @IsNotEmpty({ message: 'The email is required' })
  public email: string;
}
