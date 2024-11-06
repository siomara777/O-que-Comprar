import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { childRoutesGuard } from './child-routes.guard';

describe('childRoutesGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => childRoutesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
