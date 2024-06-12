import {Routes} from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {AppBasicLayoutComponent} from "./components/layout/app-basic-layout/app-basic-layout.component";
import {AboutPageComponent} from "./pages/about-page/about-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {ResetPasswordPageComponent} from "./pages/reset-password-page/reset-password-page.component";
import {ForgotPasswordPageComponent} from "./pages/forgot-password-page/forgot-password-page.component";

export const routes: Routes = [
  {
    path: "",
    component: AppBasicLayoutComponent,
    children: [
      {
        path: "", component: HomePageComponent,
        data: {state: 'home'}
      },
      {
        path: "password-reset/:token", component: ResetPasswordPageComponent,
        data: {state: 'password-reset'}
      },  {
        path: "forgot-password", component: ForgotPasswordPageComponent,
        data: {state: 'forgot-password'}
      },
      {
        path: "about", component: AboutPageComponent,
        data: {state: 'about'}
      },
      {
        path: '404', component: NotFoundPageComponent,
        data: {state: '404'}
      },
      {path: '**', redirectTo: '/404', pathMatch: 'full'}
    ]
  }
];
