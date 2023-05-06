import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register();
  }

  @Get('revalidate')
  revalidateToken(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register();
  }
}
