import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {HttpClientXsrfModule, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {sanctumAuthInterceptor} from "./interceptors/sanctum-auth.interceptor";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([sanctumAuthInterceptor]),
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      HttpClientXsrfModule.withOptions({
        cookieName: environment.XSRF_COOKIE_NAME,
        headerName: environment.XSRF_HEADER_NAME,
      })
    ),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["http://localhost:8000"],
          disallowedRoutes: ["http://localhost:8000/api, http://localhost:8000/api/user"],
        },
      }),
    ), provideAnimationsAsync(),

    // provideErrorTailorConfig({ TODO https://github.com/ngneat/error-tailor
    //   errors: {
    //     useValue: {
    //       required: 'Это поле обязательно к заполнению',
    //       minlength: ({ requiredLength, actualLength }) =>
    //         `Минимальная длина поля: ${requiredLength}, текущая: ${actualLength}`,
    //       email: error => `Поле не соответствует формату электронной почты.`
    //     }
    //   }
    // })
  ]
};
