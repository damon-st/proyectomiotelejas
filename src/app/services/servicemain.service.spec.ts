import { TestBed } from '@angular/core/testing';

import { ServicemainService } from './servicemain.service';

describe('ServicemainService', () => {
  let service: ServicemainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicemainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
