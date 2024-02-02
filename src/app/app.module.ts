import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal';

//Social login
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

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
import { DetalleActivoComponent } from './paginas/detalle-activo/detalle-activo.component';
import { QrActivoComponent } from './paginas/qr-activo/qr-activo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




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
    DetalleActivoComponent,
    QrActivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi : true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('166094090542-57ejomp43rk14js6c490p23up87k239r.apps.googleusercontent.com'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
