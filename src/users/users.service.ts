import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
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
    await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

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

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) throw new NotFoundException('User not found 🔍');

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ email });
    if (!user) throw new NotFoundException('User not found ❌🔍');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changePassword(changePassword: string): Promise<string> {
    return 'This action changes a password';
  }

  async changeEmail(changeEmail: string): Promise<string> {
    return 'This action changes a email';
  }

  async userProfile(): Promise<string> {
    return 'This action returns a user profile';
  }

  private handleDBErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('💣 Check server logs ');
  };
}
