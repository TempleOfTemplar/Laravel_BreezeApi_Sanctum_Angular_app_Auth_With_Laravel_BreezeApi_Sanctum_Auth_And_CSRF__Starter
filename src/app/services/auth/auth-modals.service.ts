import {Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LoginModalComponent} from "../../components/modals/login-modal/login-modal.component";
import {RegisterModalComponent} from "../../components/modals/register-modal/register-modal.component";

@Injectable({
  providedIn: 'root'
})
export class AuthModalsService {
  private static loginModalInstance: MatDialogRef<LoginModalComponent>;
  private static registerModalInstance: MatDialogRef<RegisterModalComponent>;

  constructor(private dialog: MatDialog) {
  }

  openLoginModal(): MatDialogRef<LoginModalComponent> {
    if (AuthModalsService.loginModalInstance) {
      return AuthModalsService.loginModalInstance;
    }

    AuthModalsService.loginModalInstance = this.dialog.open<LoginModalComponent>(LoginModalComponent, {
      restoreFocus: true,
      disableClose: true,
      data: null,
    });

    return AuthModalsService.loginModalInstance;
  }

  closeLoginModal(withResult: any = null): void {
    AuthModalsService.loginModalInstance.close(withResult);
  }

  openRegisterModal(): MatDialogRef<RegisterModalComponent> {
    if (AuthModalsService.registerModalInstance) {
      return AuthModalsService.registerModalInstance;
    }

    AuthModalsService.registerModalInstance = this.dialog.open<RegisterModalComponent>(RegisterModalComponent, {
      restoreFocus: true,
      disableClose: true,
      data: null,
    });

    return AuthModalsService.registerModalInstance;
  }

  closeRegisterModal(withResult: any = null): void {
    AuthModalsService.registerModalInstance.close(withResult);
  }
}
