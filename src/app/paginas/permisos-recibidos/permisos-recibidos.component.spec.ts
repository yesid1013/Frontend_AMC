import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosRecibidosComponent } from './permisos-recibidos.component';

describe('PermisosRecibidosComponent', () => {
  let component: PermisosRecibidosComponent;
  let fixture: ComponentFixture<PermisosRecibidosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermisosRecibidosComponent]
    });
    fixture = TestBed.createComponent(PermisosRecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
