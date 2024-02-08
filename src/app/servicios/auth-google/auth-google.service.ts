import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oAuthService: OAuthService) { }

  initLogin(){
    const config: AuthConfig = {
      issuer : 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId : environment.clientId,
      redirectUri: window.location.origin + '/main',
      scope: 'openid profile email'
    }

    this.oAuthService.configure(config);
    this.oAuthService.setupAutomaticSilentRefresh()
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
   }
}
