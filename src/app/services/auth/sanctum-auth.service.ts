import {Injectable} from '@angular/core';
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../models/User.model";

// export const

@Injectable({
  providedIn: 'root'
})
export class SanctumAuthService {
  get verificationEmailSended$(): Observable<boolean> {
    return this._verificationEmailSended$;
  }

  get currentUser$(): Observable<User | null> {
    return this._currentUser$;
  }

  get currentUserSnapshot(): User | null {
    return this._currentUser$.value;
  }

  private _verificationEmailSended$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private _currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {
  }

  async obtainCsrf(): Promise<void> {
    try {
      await lastValueFrom(this.httpClient.get<any>(environment.XSRF_URL));
    } catch (error: unknown) {
      // TODO handle error
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      this._verificationEmailSended$.next(false);

      const response = await lastValueFrom(this.httpClient.post<void>(environment.SEND_VERIFICATION_EMAIL_URL, null));

      this._verificationEmailSended$.next(true);
      return response;
    } catch (error: unknown) {
      // TODO handle error
    }
  }

  async updateCurrentUser(): Promise<User | null> {
    try {
      const response = await lastValueFrom(this.httpClient.get<any>(environment.USER_URL));
      this._currentUser$.next(response);
      return response;
    } catch (error: unknown) {
      // TODO handle error
      return null;
    }
  }

  async logout(): Promise<unknown> {
    try {
      const response = await lastValueFrom(this.httpClient.post(environment.LOGOUT_URL, {withCredentials: true}));
      this._currentUser$.next(null);
      return response;
    } catch (error: unknown) {
      // TODO handle error
      return error;
    }
  }

  async forgotPassword(email: string): Promise<unknown> {
    try {
      await this.obtainCsrf();
      return await lastValueFrom(this.httpClient.post(environment.FORGOT_PASSWORD_URL, {
        email,
      }, {withCredentials: true}));
    } catch (error: unknown) {
      // TODO handle error
      return error;
    }
  }

  async login(email: string, password: string): Promise<any | null> {
    try {
      await this.obtainCsrf();
      const response = await lastValueFrom(this.httpClient.post(environment.LOGIN_URL, {
        email,
        password
      }, {withCredentials: true}));
      this.updateCurrentUser();
      return response;
    } catch (error: unknown) {
      // TODO handle error
      return error;
    }

    // return this.httpClient.post(environment.LOGIN_URL, {email, password})
    //   .pipe(
    // HttpHelpers.retry(), TODO Retries
    // catchError( TODO Error handling
    //   (err, caught: Observable<any>) => {
    //     switch (err.status) {
    //       case 400:
    //       case 401:
    //         return throwError(() => new HttpError('Login details are incorrect, use forgot password', err.status));
    //       case 500:
    //         return throwError(() => new HttpError('Problem logging in, please try again', err.status));
    //       case 0:
    //       default:
    //         return throwError(() => new HttpError('Problem logging in, please check network and try again', err.status));
    //     }
    //   },
    // ),
    // map(
    //   (data: any) => {
    //     console.log("LOGIN MAP", data);
    //     return data;
    //   },
    // )
    // );
  }

  async register(name: string, email: string, password: string): Promise<any | null> {
    try {
      await this.obtainCsrf();
      const response = await lastValueFrom(this.httpClient.post(environment.REGISTER_URL, {name, email, password}));
      this.updateCurrentUser();
      return response;
    } catch (error: unknown) {
      // TODO handle error
      return null;
    }
  }
}
