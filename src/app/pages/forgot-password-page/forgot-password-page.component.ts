import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatDialogActions, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRipple} from "@angular/material/core";
import {BehaviorSubject} from "rxjs";
import {SanctumAuthService} from "../../services/auth/sanctum-auth.service";
import {ControlsFrom} from "../../models/forms/utils/ControlsFrom";
import {IForgotPasswordForm} from "../../models/forms/IForgotPasswordForm";

@Component({
  selector: 'forgot-password-page',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    MatRipple,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPageComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  displayedErrorMessage$ = new BehaviorSubject<null | string>(null);

  constructor(private readonly fb: NonNullableFormBuilder,
              private sanctumAuthService: SanctumAuthService) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group<ControlsFrom<IForgotPasswordForm>>({
      email:  this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  async submit(): Promise<void> {
    if (!this.forgotPasswordForm.valid) {
      return;
    }

    try {
      const email = this.emailFormControl.value;

      this.isSubmitting$.next(true);
      await this.sanctumAuthService.forgotPassword(email);
      this.isSubmitting$.next(false);
    } catch (loginError: unknown) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next('Не удалось отправить ссылку для восстановления пароля.');
    }
  }

  get emailFormControl(): FormControl {
    return this.forgotPasswordForm.get('email') as FormControl;
  }
}
