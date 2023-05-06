import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'User Email' })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'User pasword',
    minimum: 6,
    maximum: 50,
  })
  password: string;
}
