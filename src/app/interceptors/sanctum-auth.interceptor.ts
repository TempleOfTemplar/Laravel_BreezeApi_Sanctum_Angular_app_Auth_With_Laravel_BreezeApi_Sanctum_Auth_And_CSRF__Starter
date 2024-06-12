import {HttpErrorResponse, HttpInterceptorFn, HttpXsrfTokenExtractor} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {inject} from "@angular/core";
import {environment} from "../../environments/environment";

export const sanctumAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject<HttpXsrfTokenExtractor>(HttpXsrfTokenExtractor);

  req = req.clone({
    withCredentials: true
  })

  req.headers.set('withCredentials', 'true');
  if (req.method === 'GET' || req.method === 'HEAD') {
    return next(req);
  }

  const token = tokenService.getToken();
  // Be careful not to overwrite an existing header of the same name.
  if (token !== null && !req.headers.has(environment.XSRF_HEADER_NAME)) {
    req = req.clone({headers: req.headers.set(environment.XSRF_HEADER_NAME, token)});
  }

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        if (err.status === 401) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
