import { TestBed } from '@angular/core/testing';

import { SubclienteService } from './subcliente.service';

describe('SubclienteService', () => {
  let service: SubclienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubclienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
