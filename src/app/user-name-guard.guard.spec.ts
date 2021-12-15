import { TestBed } from '@angular/core/testing';

import { UserNameGuardGuard } from './user-name-guard.guard';

describe('UserNameGuardGuard', () => {
  let guard: UserNameGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserNameGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
