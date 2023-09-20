import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  ForgotComponent,
  LogInComponent,
  ConfirmAccountComponent,
  SignUpComponent,
  CheckMailComponent,
  ChangePasswordComponent
 } from './index';
import { canActivateAuthGuard } from '../shared';


const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'confirm/account/:email', component: ConfirmAccountComponent },
  { path: 'password/forgot/check-mail/:email', component: CheckMailComponent },
  { path: 'password/forgot', component: ForgotComponent },
  { path: 'password/change/:token', component: ChangePasswordComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
