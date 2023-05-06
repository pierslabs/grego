import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'User name',
    minimum: 2,
    maximum: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @ApiProperty({ type: String, description: 'User email' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    minimum: 6,
    maximum: 50,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
