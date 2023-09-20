import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPasswordDirective } from './directives/show-password.directive';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import {
  ForgotComponent,
  LogInComponent,
  ConfirmAccountComponent,
  SignUpComponent,
  CheckMailComponent,
  ChangePasswordComponent
 } from './index';


@NgModule({
  declarations: [
    SignUpComponent,
    LogInComponent,
    ConfirmAccountComponent,
    ShowPasswordDirective,
    ForgotComponent,
    CheckMailComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
