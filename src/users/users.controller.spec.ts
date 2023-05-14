import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PassportModule } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

describe.only('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  const user: User = {
    userId: '1',
    name: '',
    email: '',
    verifyEmail: false,
    password: '',
    isActive: false,
    roles: [],
    createdAt: undefined,
    updatedAt: undefined,
    checkfieldsBeforeInsert: function (): void {
      throw new Error('Function not implemented.');
    },
    checkfieldsBeforeUpdate: function (): void {
      throw new Error('Function not implemented.');
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            create: jest.fn(() => []),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            findOneByEmail: jest.fn(() => {}),
            changePassword: jest.fn(() => {}),
            changeEmail: jest.fn(() => {}),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling create create method', () => {
    const dto = new CreateUserDto();
    controller.create(dto);

    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('calling findAll note method', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('calling profile-user ', () => {
    controller.profileUser(user);
    expect(controller.profileUser(user)).toBe(user);
  });

  it('calling findOne method', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalled();
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('calling findOneByEmail method', () => {
    const email = 'fake@email.com';
    controller.findOneByEmail(email);
    expect(service.findOneByEmail).toHaveBeenCalled();
    expect(service.findOneByEmail).toHaveBeenCalledWith(email);
  });

  it('calling update method', () => {
    const dto = new UpdateUserDto();
    const id = '1';

    controller.update(id, dto);

    expect(service.update).toHaveBeenCalled();
    expect(service.update).toHaveBeenCalledWith(id, dto);
  });

  it('calling remove method', () => {
    const id = '1';
    controller.remove(id);

    expect(service.remove).toHaveBeenCalled();
    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('calling changePassword method', () => {
    const password = '123456';

    controller.changePassword(user, password);

    expect(service.changePassword).toHaveBeenCalled();
    expect(service.changePassword).toHaveBeenCalledWith(user, password);
  });

  it('calling changeEmail method', () => {
    const email = 'fake@test.com';
    controller.changeEmail(user, email);

    expect(service.changeEmail).toHaveBeenCalled();
    expect(service.changeEmail).toHaveBeenCalledWith(user, email);
  });
});
