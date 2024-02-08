import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) {
    this.initLogin()
   }

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

   logout(){
    this.oAuthService.logOut()
   }

   getProfile(){
    return this.oAuthService.getIdentityClaims()
   }
}
