import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService,private http: HttpClient) {
    this.initLogin()
   }
   
   url ='http://127.0.0.1:5000/api/v1/';

  initLogin(){
    const config: AuthConfig = {
      issuer : 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId : environment.clientId,
      redirectUri: window.location.origin + '/activos',
      scope: 'openid profile email'
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh()
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
   }

   login(){
    this.oAuthService.initLoginFlow();
   }

   login_google() : Observable<any>{
    const tokenid = sessionStorage.getItem('id_token'); // obtengo el id token de google
    return this.http.post(`${this.url}login_google`,{token_google : tokenid})
  }


   logout(){
    this.oAuthService.logOut()
   }

   getProfile(){
    return this.oAuthService.getIdentityClaims()
   }
}
