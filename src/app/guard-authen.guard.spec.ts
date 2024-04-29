import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardAuthenGuard } from './guard-authen.guard';

describe('guardAuthenGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardAuthenGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
