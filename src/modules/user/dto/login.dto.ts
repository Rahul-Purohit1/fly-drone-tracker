import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}