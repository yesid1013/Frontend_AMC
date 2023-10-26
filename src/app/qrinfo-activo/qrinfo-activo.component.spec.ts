import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRInfoActivoComponent } from './qrinfo-activo.component';

describe('QRInfoActivoComponent', () => {
  let component: QRInfoActivoComponent;
  let fixture: ComponentFixture<QRInfoActivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QRInfoActivoComponent]
    });
    fixture = TestBed.createComponent(QRInfoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
