import { User } from 'src/users/entities/user.entity';

export type AuthReponse = {
  token: string;
  user: User;
};
