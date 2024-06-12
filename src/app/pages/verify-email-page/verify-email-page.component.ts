import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {SanctumAuthService} from "../../services/auth/sanctum-auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'verify-email-page',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe
  ],
  templateUrl: './verify-email-page.component.html',
  styleUrl: './verify-email-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyEmailPageComponent implements OnInit {
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  displayedErrorMessage$ = new BehaviorSubject<null | string>(null);
  verificationEmailSended$: Observable<boolean>;

  constructor(private sanctumAuthService: SanctumAuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.verificationEmailSended$ = this.sanctumAuthService.verificationEmailSended$;
  }

  async resendVerificationEmail(): Promise<void> {
    try {
      this.isSubmitting$.next(true);
      await this.sanctumAuthService.sendVerificationEmail();
      this.isSubmitting$.next(false);
    } catch (error: any) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next(error.toString());
    }
  }

  async logout(): Promise<void> {
    try {
      this.isSubmitting$.next(true);
      await this.sanctumAuthService.logout();
      this.isSubmitting$.next(false)
      this.router.navigate(['/']);
    } catch (error: any) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next(error.toString());
    }
  }
}
