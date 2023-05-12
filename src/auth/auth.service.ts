import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthReponse } from './types/authResponse';
import { User } from 'src/users/entities/user.entity';

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

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with admin 👮‍♂️');

    delete user.password;

    return user;
  }

  async logout(user: User): Promise<User> {
    return user;
  }

  async refresh(user: User): Promise<AuthReponse> {
    const token = this.getJwtToken(user.userId);
    return { token };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const isValid = this.jwtService.verify(token).id ? true : false;
      return isValid;
    } catch (error) {
      this.logger.error('💣 invalid token ', error);
      throw new UnauthorizedException('Invalid Token');
    }
  }

  // TODO: implement this methods
  async forgotPassword(email: string): Promise<string> {
    return 'forgotPassword: ' + email;
  }

  async resetPassword(email: string): Promise<string> {
    this.logger.log('resetPassword', email);
    return 'resetPassword';
  }

  async verifyEmail(email: string): Promise<string> {
    this.logger.log('verifyEmail', email);
    return 'verifyEmail';
  }

  async revokeToken(token: string): Promise<string> {
    this.logger.log('revokeToken', token);
    return 'revokeToken';
  }
}
