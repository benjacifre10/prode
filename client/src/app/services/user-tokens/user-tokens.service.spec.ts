import { TestBed } from '@angular/core/testing';

import { UserTokensService } from './user-tokens.service';

describe('UserTokensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTokensService = TestBed.get(UserTokensService);
    expect(service).toBeTruthy();
  });
});
