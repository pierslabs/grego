import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    createUser: jest.fn(dto => {
      return {
        id: '1234',
        ...dto
      }
    }),

    signIn: jest.fn(() => {
      return {
        accessToken: 'fake jwtoken'
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).overrideProvider(AuthService).useValue(mockAuthService).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async() => {
    const dto: CreateAuthDto = {
      name: 'piter',
       email:'pi@pi.com',
       password:'12345',
       updatedAt: null
    }

    expect(controller.create(dto)).toEqual({
      id: expect.any(String),
      name: 'piter',
      email:'pi@pi.com',
      password:'12345',
      updatedAt: null
    })
    expect(mockAuthService.createUser).toBeCalledWith(dto);
    expect(mockAuthService.createUser).toBeCalledTimes(1);
  });

  it('should signup user', ()=> {
    const credentialsDto: AuthCredentialsDto = {
      email: 'pi@pi.com',
      password: '12345'
    }

    expect(controller.signIn(credentialsDto)).toEqual({accessToken: expect.any(String)});
    expect(mockAuthService.signIn).toBeCalledWith(credentialsDto);
    expect(mockAuthService.signIn).toBeCalledTimes(1);
  })

});
