import { TestBed } from '@angular/core/testing';

import { SalaryComputationsService } from './salary-computations.service';

describe('SalaryComputationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalaryComputationsService = TestBed.get(SalaryComputationsService);
    expect(service).toBeTruthy();
  });
});
