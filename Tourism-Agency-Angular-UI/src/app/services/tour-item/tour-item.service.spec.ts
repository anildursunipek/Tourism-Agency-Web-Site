import { TestBed } from '@angular/core/testing';

import { TourItemService } from './tour-item.service';

describe('TourItemService', () => {
  let service: TourItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
