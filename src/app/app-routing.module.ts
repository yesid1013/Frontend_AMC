import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LoginComponent } from './paginas/login/login.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { FichaTecnicaComponent } from './paginas/ficha-tecnica/ficha-tecnica.component';
import { InformeServicioComponent } from './paginas/informe-servicio/informe-servicio.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AuthGuard } from './utils/auth.guard';
import { CostoServicioComponent } from './paginas/costo-servicio/costo-servicio.component';
import { PermisosComponent } from './paginas/permisos/permisos.component';
import { PermisosRecibidosComponent } from './paginas/permisos-recibidos/permisos-recibidos.component';
import { InformacionPermisosComponent } from './paginas/informacion-permisos/informacion-permisos.component';
import { DetalleActivoComponent } from './paginas/detalle-activo/detalle-activo.component';


const routes: Routes = [

  {
    path:'activos',
    component: ActivosComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'',
    redirectTo : 'login',
    pathMatch : 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path : 'servicios',
    component : ServiciosComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'ficha_tecnica',
    component : FichaTecnicaComponent,
    canActivate : [AuthGuard]
  },
  {
    path: 'informe_servicio',
    component: InformeServicioComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'costo_servicio',
    component : CostoServicioComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'spinner',
    component: SpinnerComponent
  },
  {
    path : 'permisos/:id_activo',
    component : PermisosComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'permisos_recibidos',
    component : PermisosRecibidosComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'informacion_permisos/:id_permiso',
    component : InformacionPermisosComponent,
    canActivate : [AuthGuard]
  },

  {
    path : 'detalle_activo/:id_activo',
    component : DetalleActivoComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
