import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatRipple} from "@angular/material/core";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SanctumAuthService} from "../../../services/auth/sanctum-auth.service";
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";


@Component({
  selector: 'login-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    // errorTailorImports, TODO https://github.com/ngneat/error-tailor
    MatRipple,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatError,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatButton,
    MatInput,
    MatLabel,
    MatRipple,
    MatSuffix,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginModalComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  passwordMinLength: number = 8;
  displayedErrorMessage$ = new BehaviorSubject<null | string>(null);

  constructor(@Optional() public dialogRef: MatDialogRef<LoginModalComponent>,
              // @Inject(MAT_DIALOG_DATA) private jwtExists: boolean/*JWTAndUser*//*: DialogData*/,
              private readonly sanctumAuthService: SanctumAuthService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    });
  }

  async submit(): Promise<void> {
    if (!this.loginForm.valid) {
      return;
    }

    try {
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;
      this.isSubmitting$.next(true);
      const serverResponse = await this.sanctumAuthService.login(email, password);
      this.isSubmitting$.next(false);
      this.dialogRef.close(serverResponse);
    } catch (loginError: unknown) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next('Не удалось войти.');
    }
  }

  get emailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
