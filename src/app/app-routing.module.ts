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


const routes: Routes = [

  {
    path:'equipos',
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
    component : ServiciosComponent
  },
  {
    path: 'ficha_tecnica',
    component : FichaTecnicaComponent
  },
  {
    path: 'informe_servicio',
    component: InformeServicioComponent
  },
  {
    path : 'spinner',
    component: SpinnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
