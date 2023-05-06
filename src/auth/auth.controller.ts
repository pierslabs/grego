import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO
  // @Post('login')
  // login(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.login(createAuthDto);
  // }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  // TODO
  // @Get('revalidate')
  // revalidateToken() {
  //   return this.authService.revalidateToken();
  // }
}
