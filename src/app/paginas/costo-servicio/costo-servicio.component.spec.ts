import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostoServicioComponent } from './costo-servicio.component';

describe('CostoServicioComponent', () => {
  let component: CostoServicioComponent;
  let fixture: ComponentFixture<CostoServicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostoServicioComponent]
    });
    fixture = TestBed.createComponent(CostoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
