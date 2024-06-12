import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatDialogTitle} from "@angular/material/dialog";
import {BehaviorSubject} from "rxjs";
import {SanctumAuthService} from "../../services/auth/sanctum-auth.service";
import {ControlsFrom} from "../../models/forms/utils/ControlsFrom";
import {fieldsMatchValidatorFn} from "../../validators/fields-match.validatorfn";
import {IResetPasswordForm} from "../../models/forms/IResetPasswordForm";

const upperLowerSymbolNumberRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;


@Component({
  selector: 'reset-password-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    MatDialogTitle
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  passwordMinLength: number = 8;

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  displayedErrorMessage$ = new BehaviorSubject<null | string>(null);

  constructor(private readonly fb: NonNullableFormBuilder,
              private sanctumAuthService: SanctumAuthService) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group<ControlsFrom<IResetPasswordForm>>({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(this.passwordMinLength), Validators.pattern(upperLowerSymbolNumberRegex)]),
      password_confirmation: this.fb.control('', [Validators.required]),
    }, {
      validators: fieldsMatchValidatorFn(
        'password',
        'password_confirmation'
      ),
    });
  }

  async submit(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    try {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;

      this.isSubmitting$.next(true);
      await this.sanctumAuthService.forgotPassword(email);
      this.isSubmitting$.next(false);
    } catch (loginError: unknown) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next('Не удалось отправить ссылку для восстановления пароля.');
    }
  }

  get emailFormControl(): FormControl {
    return this.resetPasswordForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get passwordConfirmationFormControl(): FormControl {
    return this.resetPasswordForm.get('password_confirmation') as FormControl;
  }
}
