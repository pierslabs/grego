import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'User name',
    minimum: 2,
    maximum: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, description: 'User email' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minimum: 6,
    maximum: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  password?: string;
}
