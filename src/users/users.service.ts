import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  logger = new Logger('User Service');

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = bcrypt.hashSync(createUserDto.password, salt);

      const user = this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(`💣 ${error}`);
      this.handleDBErrors(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('💣 Check server logs ');
  };
}
