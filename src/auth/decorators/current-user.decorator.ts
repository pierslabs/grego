import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (roles = [], context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const user = req.user;

    return user;
  },
);
