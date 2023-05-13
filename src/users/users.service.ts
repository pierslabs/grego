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

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(`💣 ${error}`);
      this.handleDBErrors(error);
    }
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) throw new NotFoundException('User not found 🔍');
    const salt = await bcrypt.genSalt(10);

    if (updateUserDto.password) {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, salt);
    }

    try {
      const updateUser = await this.userRepository.preload({
        ...user,
        ...updateUserDto,
      });

      return await this.userRepository.save(updateUser);
    } catch (error) {
      this.logger.error(`💣 ${error}`);
      this.handleDBErrors(error);
    }
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ userId: id });
    if (!user) throw new NotFoundException('User not found 🔍');
    try {
      await this.userRepository.softDelete(id);
    } catch (error) {
      this.logger.error(`💣 ${error}`);
      this.handleDBErrors(error);
    }
  }

  async changePassword(user: User, password: string): Promise<User> {
    const { userId } = user;

    const userUpdate = await this.update(userId, {
      password: password,
    });
    delete userUpdate.password;
    delete userUpdate.token;
    return userUpdate;
  }

  async changeEmail(user: User, changeEmail: string): Promise<User> {
    const { userId } = user;
    const userUpdate = await this.update(userId, {
      email: changeEmail,
    });
    delete userUpdate.password;
    delete userUpdate.token;
    return userUpdate;
  }

  async userProfile(user: User): Promise<any> {
    return user;
  }

  private handleDBErrors = (error: any): never => {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail.replace('key ', ''));
    }
    throw new InternalServerErrorException('💣 Check server logs ');
  };
}
