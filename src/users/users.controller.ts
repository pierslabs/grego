import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Auth } from '../auth/decorators/auth-decorator';
import { ValidRoles } from '../auth/enums/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  logger = new Logger('User Service');

  @Post()
  @Auth(ValidRoles.admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.admin)
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('profile-user')
  @Auth(ValidRoles.user)
  profileUser(@CurrentUser([ValidRoles.user]) user: User) {
    return user;
  }

  @Get(':id')
  @Auth(ValidRoles.user)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  @Auth(ValidRoles.admin)
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.user)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }

  @Post('change-password')
  @Auth(ValidRoles.user)
  @ApiBody({
    type: String,
    examples: {
      newPassword: {
        value: { password: 'string' },
      },
    },
  })
  async changePassword(
    @CurrentUser([ValidRoles.user])
    user: User,
    @Body('password') password: string,
  ): Promise<User> {
    return await this.usersService.changePassword(user, password);
  }

  @Post('change-email')
  @Auth(ValidRoles.user)
  @ApiBody({
    type: String,
    examples: {
      email: {
        value: { changeEmail: 'string' },
      },
    },
  })
  async changeEmail(
    @CurrentUser([ValidRoles.user])
    user: User,
    @Body('changeEmail') changeEmail: string,
  ): Promise<User> {
    return await this.usersService.changeEmail(user, changeEmail);
  }
}
