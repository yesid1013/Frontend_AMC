import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { FichaTecnicaComponent } from './paginas/ficha-tecnica/ficha-tecnica.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    ActivosComponent,
    FooterComponent,
    ServiciosComponent,
    FichaTecnicaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
