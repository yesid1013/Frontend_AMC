import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrActivoComponent } from './qr-activo.component';

describe('QrActivoComponent', () => {
  let component: QrActivoComponent;
  let fixture: ComponentFixture<QrActivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QrActivoComponent]
    });
    fixture = TestBed.createComponent(QrActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
