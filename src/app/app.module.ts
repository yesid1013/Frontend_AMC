import { NgModule,importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from "angular-datatables";
import { ModalModule } from 'ngx-bootstrap/modal';
import {provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';



// Componentes
import { LoginComponent } from './paginas/login/login.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { ActivosComponent } from './paginas/activos/activos.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { PermisosComponent } from './paginas/permisos/permisos.component';
import { PermisosRecibidosComponent } from './paginas/permisos-recibidos/permisos-recibidos.component';
import { SearchFilterPipe } from './utils/search-filter.pipe';
import { InformacionPermisosComponent } from './paginas/informacion-permisos/informacion-permisos.component';
import { DetalleActivoComponent } from './paginas/detalle-activo/detalle-activo.component';
import { QrActivoComponent } from './paginas/qr-activo/qr-activo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule } from 'angular-oauth2-oidc';


const firebaseConfig = {
  apiKey: "AIzaSyCLsiCdQFqiUFRZ0RfNetVnHMoSHie0ydY",
  authDomain: "storage-amc.firebaseapp.com",
  projectId: "storage-amc",
  storageBucket: "storage-amc.appspot.com",
  messagingSenderId: "1055245546898",
  appId: "1:1055245546898:web:12b8d0a25a80adfe063d4b"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    ActivosComponent,
    FooterComponent,
    SpinnerComponent,
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
    OAuthModule.forRoot()
  ],
  providers: [
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideStorage(() => getStorage())
  
    ]),
    {provide : HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi : true},
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
