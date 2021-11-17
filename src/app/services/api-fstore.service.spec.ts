import { TestBed } from '@angular/core/testing';

import { ApiFStoreService } from './api-fstore.service';

describe('ApiFStoreService', () => {
  let service: ApiFStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
