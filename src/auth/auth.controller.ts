import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthReponse } from './types/authResponse';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ValidRoles } from './enums/roles.enum';
import { Auth } from './decorators/auth-decorator.ts.decorator';

type Token = {
  token: string;
};
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: String,
    examples: {
      login: {
        value: { email: 'pedro@test.com', password: '!ER34cp09k;:' },
      },
    },
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthReponse> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthReponse> {
    return await this.authService.register(createUserDto);
  }

  @Get('refresh')
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  async refresh(@CurrentUser() user: User): Promise<AuthReponse> {
    return await this.authService.refresh(user);
  }

  @Post('validate-token')
  @ApiBearerAuth()
  @ApiBody({
    type: String,
    examples: {
      token: {
        value: { token: 'token' },
      },
    },
  })
  @Auth(ValidRoles.user)
  async validateToken(@Body() { token }: Token): Promise<boolean> {
    return await this.authService.validateToken(token);
  }

  // TODO: Implementar los siguientes endpoints

  @Post('verify-email')
  @ApiBearerAuth()
  @Auth(ValidRoles.user)
  async verifyEmail(@Body() email: string): Promise<string> {
    return await this.authService.verifyEmail(email);
  }

  @Get('revoke-token')
  @ApiBearerAuth()
  @ApiBody({
    type: String,
    examples: {
      token: {
        value: { token: 'token' },
      },
    },
  })
  @Auth(ValidRoles.user)
  async revokeToken(@Body() token: string): Promise<string> {
    return await this.authService.revokeToken(token);
  }

  @Post('forgot-password')
  @ApiBearerAuth()
  @ApiBody({
    type: String,
    examples: {
      email: {
        value: { email: 'chuck@norris.com' },
      },
    },
  })
  async forgotPassword(@Body() email: string): Promise<string> {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @ApiBearerAuth()
  @ApiBody({
    type: String,
    examples: {
      email: {
        value: { email: 'string' },
      },
    },
  })
  @Auth(ValidRoles.user)
  async resetPassword(
    @Body()
    email: string,
  ): Promise<string> {
    return await this.authService.resetPassword(email);
  }

  @Post('logout')
  @ApiBearerAuth()
  @Auth(ValidRoles.user, ValidRoles.admin, ValidRoles.superUser)
  async logout(@CurrentUser() user: User): Promise<User> {
    console.log(user);
    return await this.authService.logout(user);
  }

  @Get('private')
  @ApiBearerAuth()
  @Auth(ValidRoles.user, ValidRoles.admin, ValidRoles.superUser)
  private(@CurrentUser() user: User) {
    return user;
  }
}
