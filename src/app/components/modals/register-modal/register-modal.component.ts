import {ChangeDetectionStrategy, Component, OnInit, Optional} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRipple} from "@angular/material/core";
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {BehaviorSubject, lastValueFrom} from "rxjs";
import {SanctumAuthService} from "../../../services/auth/sanctum-auth.service";
import {IRegisterForm} from "../../../models/forms/IRegisterForm";
import {ControlsFrom} from "../../../models/forms/utils/ControlsFrom";
import {fieldsMatchValidatorFn} from "../../../validators/fields-match.validatorfn";

const upperLowerSymbolNumberRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

// const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
@Component({
  selector: 'register-modal',
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
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModalComponent implements OnInit {
  registerForm!: FormGroup;
  nameMinLength: number = 3;
  passwordMinLength: number = 8;

  isSubmitting$ = new BehaviorSubject<boolean>(false);
  displayedErrorMessage$ = new BehaviorSubject<null | string>(null);

  constructor(@Optional() public dialogRef: MatDialogRef<RegisterModalComponent>,
              // @Inject(MAT_DIALOG_DATA) private jwtExists: boolean/*JWTAndUser*//*: DialogData*/,
              private readonly sanctumAuthService: SanctumAuthService,
              private readonly fb: NonNullableFormBuilder) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group<ControlsFrom<IRegisterForm>>({
      name: this.fb.control('', [Validators.required, Validators.minLength(this.nameMinLength)], []),
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
    if (!this.registerForm.valid) {
      return;
    }

    try {
      const name = this.nameFormControl.value;
      const email = this.emailFormControl.value;
      const password = this.passwordFormControl.value;

      this.isSubmitting$.next(true);

      const serverResponse = await this.sanctumAuthService.register(name, email, password)

      this.isSubmitting$.next(false);

      this.dialogRef.close(serverResponse);
    } catch (loginError: unknown) {
      this.isSubmitting$.next(false);
      this.displayedErrorMessage$.next('Не удалось войти.');
    }
  }

  get nameFormControl(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get passwordConfirmationFormControl(): FormControl {
    return this.registerForm.get('password_confirmation') as FormControl;
  }
}
