import {
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';
import { ValidRoles } from '../enums/roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user;

    if (!user)
      throw new InternalServerErrorException(`No user inside - authGuard`);

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      if (roles.includes(role)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `User ${user.name} need a valid role ${roles}`,
    );
  },
);
