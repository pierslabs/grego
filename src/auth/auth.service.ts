import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Auth } from "./entities/auth.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "./dto/jwt-payload.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepo: Repository<Auth>,
    private jwtservice: JwtService
  ) {}

  async createUser(createAuthDto: CreateAuthDto): Promise<void> {
    const { name, password, email, updatedAt } = createAuthDto;
    const findUser = await this.userRepo.findOneBy({ email });

    if (findUser) throw new ConflictException("Useralready exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepo.create({
      name,
      email,
      password: hashPassword,
      updatedAt: null,
    });

    await this.userRepo.save(user);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {

    const { email, password } = authCredentialsDto;

    const findUser = await this.userRepo.findOneBy({ email });

    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const payload: IJwtPayload = {email};
      const accessToken: string = await this.jwtservice.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException();
    }
  }
}
