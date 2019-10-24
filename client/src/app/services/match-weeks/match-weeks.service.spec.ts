import { TestBed } from '@angular/core/testing';

import { MatchWeeksService } from './match-weeks.service';

describe('MatchWeeksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchWeeksService = TestBed.get(MatchWeeksService);
    expect(service).toBeTruthy();
  });
});
