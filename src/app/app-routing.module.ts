import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { LoginComponent } from './paginas/login/login.component';
import { ActivosComponent } from './paginas/activos/activos.component';

const routes: Routes = [
  {path:'activos',
  component: ActivosComponent
  },
  {
    path:'',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
