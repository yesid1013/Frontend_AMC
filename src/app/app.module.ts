import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";

// Componentes
import { LoginComponent } from './paginas/login/login.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { FichaTecnicaComponent } from './paginas/ficha-tecnica/ficha-tecnica.component';
import { InformeServicioComponent } from './paginas/informe-servicio/informe-servicio.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { CostoServicioComponent } from './paginas/costo-servicio/costo-servicio.component';
import { PermisosComponent } from './paginas/permisos/permisos.component';
import { PermisosRecibidosComponent } from './paginas/permisos-recibidos/permisos-recibidos.component';
import { SearchFilterPipe } from './utils/search-filter.pipe';
import { InformacionPermisosComponent } from './paginas/informacion-permisos/informacion-permisos.component';
import { QRInfoActivoComponent } from './qrinfo-activo/qrinfo-activo.component';
import { DetalleActivoComponent } from './paginas/detalle-activo/detalle-activo.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    ActivosComponent,
    FooterComponent,
    ServiciosComponent,
    FichaTecnicaComponent,
    InformeServicioComponent,
    SpinnerComponent,
    CostoServicioComponent,
    PermisosComponent,
    PermisosRecibidosComponent,
    SearchFilterPipe,
    InformacionPermisosComponent,
    QRInfoActivoComponent,
    DetalleActivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
