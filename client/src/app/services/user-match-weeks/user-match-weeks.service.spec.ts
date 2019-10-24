import { TestBed } from '@angular/core/testing';

import { UserMatchWeeksService } from './user-match-weeks.service';

describe('UserMatchWeeksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserMatchWeeksService = TestBed.get(UserMatchWeeksService);
    expect(service).toBeTruthy();
  });
});
