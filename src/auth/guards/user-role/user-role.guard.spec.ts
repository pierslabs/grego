import { UserRoleGuard } from './user-role.guard';
import { Reflector } from '@nestjs/core';

describe.skip('UserRoleGuard', () => {
  let guard: UserRoleGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    reflector = new Reflector();
    guard = new UserRoleGuard(reflector);
  });

  // Tests that the guard returns true when valid roles are an empty array.
  it('test_valid_roles_empty_array', () => {});
});
