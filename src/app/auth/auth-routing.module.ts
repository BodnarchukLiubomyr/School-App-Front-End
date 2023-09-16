import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CheckMailComponent } from './components/check-mail/check-mail.component';
import { ForgotComponent } from './components/forgot/forgot.component';


const routes: Routes = [
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'confirm/account/:email', component: ConfirmAccountComponent },
  { path: 'password/forgot/check-mail/:email', component: CheckMailComponent },
  { path: 'password/forgot', component: ForgotComponent },
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
