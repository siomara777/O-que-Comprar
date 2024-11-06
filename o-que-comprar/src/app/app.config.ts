import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAuth0 } from '@auth0/auth0-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-23htfv6n1h5zqzwn.us.auth0.com',
      clientId: 'nqUovT4PMPduYtXRYoTKDWfyQwp3NlXk',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-23htfv6n1h5zqzwn.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    })
  ],
};
