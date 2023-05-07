import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthReponse } from './types/authResponse';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthReponse> {
    return await this.authService.register(createUserDto);
  }

  @Get('revalidate')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  revalidateToken(@CurrentUser() user: User): Promise<AuthReponse> {
    return this.authService.revalidateToken(user);
  }
}
