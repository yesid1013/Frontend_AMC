import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LoginComponent } from './paginas/login/login.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { FichaTecnicaComponent } from './paginas/ficha-tecnica/ficha-tecnica.component';

const routes: Routes = [
  {
    path:'activos',
    component: ActivosComponent
  },
  {
    path:'',
    component: LoginComponent
  },
  {
    path : 'servicios',
    component : ServiciosComponent
  },
  {
    path: 'ficha_tecnica',
    component : FichaTecnicaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
