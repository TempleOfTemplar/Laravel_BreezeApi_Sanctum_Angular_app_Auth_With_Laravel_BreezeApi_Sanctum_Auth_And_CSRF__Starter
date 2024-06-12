import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthModalsService} from "../../../services/auth/auth-modals.service";
import {SanctumAuthService} from "../../../services/auth/sanctum-auth.service";
import {User} from "../../../models/User.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatAnchor,
    RouterLink,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  @Input() isHandset: boolean;
  @Input() currentUser: User | null;

  @Output() toggleSidenavButtonClick: EventEmitter<void> = new EventEmitter<void>()
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>()

  constructor(private authModalService: AuthModalsService) {
  }

  openLoginModal(): void {
    this.authModalService.openLoginModal();
  }

  openRegisterModal(): void {
    this.authModalService.openRegisterModal();
  }

}
