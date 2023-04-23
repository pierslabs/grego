import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Auth } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signup')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto):Promise<{accessToken: string}> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto):Promise<void> {
    return this.authService.createUser(createAuthDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async testJwt(@Req() req) {
    console.log(req.user)
  }
}
