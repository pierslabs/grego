import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/decorators/auth-decorator.ts.decorator';
import { ValidRoles } from 'src/auth/enums/roles.enum';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Auth(ValidRoles.superUser)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // `/change-password` (POST): Permite al usuario cambiar su contraseña después de autenticarse.
  @Post('change-password')
  async changePassword(@Body() changePassword: string): Promise<string> {
    return await this.usersService.changePassword(changePassword);
  }

  // `/change-email` (POST): Permite al usuario cambiar su dirección de correo electrónico después de autenticarse.

  @Post('change-email')
  async changeEmail(@Body() changeEmail: string): Promise<string> {
    return await this.usersService.changeEmail(changeEmail);
  }

  // `/user-profile` (GET): Obtiene los detalles del perfil del usuario autenticado.
  @Get('user-profile')
  async userProfile(): Promise<string> {
    return await this.usersService.userProfile();
  }
}
