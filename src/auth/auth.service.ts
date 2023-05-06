import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  logger = new Logger('Auth Service');

  // TODO
  // login(createAuthDto: CreateAuthDto) {
  //   console.log({ createAuthDto });
  //   return createAuthDto;
  // }

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
