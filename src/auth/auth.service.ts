import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthReponse } from './types/authResponse';

@Injectable()
export class AuthService {
  logger = new Logger('Auth Service');

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }

  async login(loginDto: LoginDto): Promise<AuthReponse> {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Email or Password are incorrect');

    const token = this.getJwtToken(user.userId);

    return {
      token,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<AuthReponse> {
    try {
      const user = await this.usersService.create(createUserDto);

      const token = this.getJwtToken(user.userId);

      return { token };
    } catch (error) {
      this.logger.error('💣', error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO
  // revalidateToken() {
  //   return `This action {revalidate} returns new token`;
  // }
}
