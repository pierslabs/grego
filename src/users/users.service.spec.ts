import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository, getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let sandbox: sinon.SinonSandbox;
  const users: User[] = [
    {
      userId: '1',
      name: 'fake name',
      email: 'fake@email.com',
      verifyEmail: false,
      password: '1234567',
      isActive: false,
      roles: ['user'],
      createdAt: undefined,
      updatedAt: undefined,
      checkfieldsBeforeInsert: function (): void {
        throw new Error('Function not implemented.');
      },
      checkfieldsBeforeUpdate: function (): void {
        throw new Error('Function not implemented.');
      },
    },
    {
      userId: '2',
      name: 'fake2 name2',
      email: 'fake2@email.com',
      verifyEmail: false,
      password: '1234567',
      isActive: false,
      roles: ['user'],
      createdAt: undefined,
      updatedAt: undefined,
      checkfieldsBeforeInsert: function (): void {
        throw new Error('Function not implemented.');
      },
      checkfieldsBeforeUpdate: function (): void {
        throw new Error('Function not implemented.');
      },
    },
  ];
  beforeEach(async () => {
    sandbox = sinon.createSandbox();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with expected params', async () => {
    const createUserSpy = jest.spyOn(service, 'create');
    const dto: CreateUserDto = {
      name: 'pier',
      email: 'email@test.com',
      password: '123456',
    };

    await service.create(dto);

    expect(createUserSpy).toHaveBeenCalledWith(dto);
  });

  it('should call findAll method with expected param', async () => {
    const findOneNoteSpy = jest.spyOn(service, 'findAll');

    await service.findAll();

    expect(findOneNoteSpy).toHaveBeenCalled();
  });

  it('should call findOne method with expected param', async () => {
    //  const findOneNoteSpy = jest
    //    .spyOn(service, 'findOne')
    //    .mockResolvedValue(users.find((id) => id === users[0]));
    //
    //  const id = '2';
    //  await service.findOne(id);
    //
    //  expect(findOneNoteSpy).toHaveBeenCalledWith(id);
  });
});
