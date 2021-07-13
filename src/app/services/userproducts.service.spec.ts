import { TestBed } from '@angular/core/testing';

import { UserproductsService } from './userproducts.service';

describe('UserproductsService', () => {
  let service: UserproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
