import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  login(createAuthDto: CreateAuthDto) {
    console.log({ createAuthDto });
    return createAuthDto;
  }

  register() {
    return `This action returns all auth`;
  }

  revalidateToken() {
    return `This action {revalidate} returns new token`;
  }
}
