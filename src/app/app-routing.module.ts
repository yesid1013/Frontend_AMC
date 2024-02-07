import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LoginComponent } from './paginas/login/login.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AuthGuard } from './utils/auth.guard';
import { PermisosComponent } from './paginas/permisos/permisos.component';
import { PermisosRecibidosComponent } from './paginas/permisos-recibidos/permisos-recibidos.component';
import { InformacionPermisosComponent } from './paginas/informacion-permisos/informacion-permisos.component';
import { DetalleActivoComponent } from './paginas/detalle-activo/detalle-activo.component';
import { QrActivoComponent } from './paginas/qr-activo/qr-activo.component';


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
  },

  {
    path : 'qractivo/:id_activo',
    component : QrActivoComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
