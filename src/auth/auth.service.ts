import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthReponse } from './types/authResponse';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  logger = new Logger('Auth Service');

  async login(loginDto: LoginDto): Promise<AuthReponse> {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    console.log(bcrypt.compareSync(password, user.password));
    if (!bcrypt.compareSync(password, user.password))
      throw new BadRequestException('Email or Password are incorrect');

    return {
      token: '1234',
      user,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersService.create(createUserDto);
      return user;
    } catch (error) {
      this.logger.error('💣', error);
      throw new InternalServerErrorException();
    }
  }

  // TODO
  // revalidateToken() {
  //   return `This action {revalidate} returns new token`;
  // }
}
