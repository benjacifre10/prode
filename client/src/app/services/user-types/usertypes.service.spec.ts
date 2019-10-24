import { TestBed } from '@angular/core/testing';

import { UsertypesService } from './usertypes.service';

describe('UsertypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsertypesService = TestBed.get(UsertypesService);
    expect(service).toBeTruthy();
  });
});
