import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPermisosComponent } from './informacion-permisos.component';

describe('InformacionPermisosComponent', () => {
  let component: InformacionPermisosComponent;
  let fixture: ComponentFixture<InformacionPermisosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionPermisosComponent]
    });
    fixture = TestBed.createComponent(InformacionPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
