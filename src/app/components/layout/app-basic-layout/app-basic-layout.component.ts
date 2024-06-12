import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatIconButton} from "@angular/material/button";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatDrawer, MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {Observable, shareReplay} from "rxjs";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {AsyncPipe, NgIf} from "@angular/common";
import {AppHeaderComponent} from "../app-header/app-header.component";
import {transition, trigger, useAnimation} from "@angular/animations";
import {routeSlideAnimation} from "../../../animations/route-slide.animation";
import {SanctumAuthService} from "../../../services/auth/sanctum-auth.service";
import {User} from "../../../models/User.model";

// Сперто: https://github.com/fireship-io/fireship.io/blob/master/content/courses/angular/app-shell.md

@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [
    MatMenu,
    MatIcon,
    MatMenuTrigger,
    MatIconButton,
    MatMenuItem,
    RouterLink,
    MatAnchor,
    MatSidenavContent,
    MatToolbar,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatListItem,
    AsyncPipe,
    NgIf,
    AppHeaderComponent,
    RouterOutlet,
    MatDrawer
  ],
  templateUrl: './app-basic-layout.component.html',
  styleUrl: './app-basic-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('routeSlide', [transition('* => *', useAnimation(routeSlideAnimation))])
  ]
})
export class AppBasicLayoutComponent implements OnInit {
  @ViewChild(MatSidenav) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map((result: BreakpointState) => result.matches),
      shareReplay()
    );

  currentUser$: Observable<User | null>;

  constructor(private breakpointObserver: BreakpointObserver,
              private sanctumAuthService: SanctumAuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.sanctumAuthService.currentUser$;

    if (!this.sanctumAuthService.currentUserSnapshot) {
      this.sanctumAuthService.updateCurrentUser();
    }
  }

  getState(outlet: RouterOutlet) {
    console.log("outlet.activatedRouteData", outlet.activatedRouteData)
    return outlet.activatedRouteData && outlet.activatedRouteData['state'] ? outlet.activatedRouteData['state'] : null;
  }

  toggleSidenav(): void {
    this.drawer.toggle();
  }

  async logout(): Promise<void> {
    try {
      await this.sanctumAuthService.logout();
      this.router.navigate(['/']);
    } catch (error: any) {
      // TODO handle error
    }
  }
}
