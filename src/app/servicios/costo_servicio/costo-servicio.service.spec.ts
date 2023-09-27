import { TestBed } from '@angular/core/testing';

import { CostoServicioService } from './costo-servicio.service';

describe('CostoServicioService', () => {
  let service: CostoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
