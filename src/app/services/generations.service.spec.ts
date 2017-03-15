import { TestBed, inject } from '@angular/core/testing';

import { GenerationsService } from './generations.service';

describe('GenerationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenerationsService]
    });
  });

  it('should ...', inject([GenerationsService], (service: GenerationsService) => {
    expect(service).toBeTruthy();
  }));
});
