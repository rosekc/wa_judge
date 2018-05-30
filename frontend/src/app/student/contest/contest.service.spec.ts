import { TestBed, inject } from '@angular/core/testing';

import { ContestService } from './contest.service';

describe('ExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContestService]
    });
  });

  it('should be created', inject([ContestService], (service: ContestService) => {
    expect(service).toBeTruthy();
  }));
});
