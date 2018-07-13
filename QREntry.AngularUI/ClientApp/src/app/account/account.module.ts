import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent, FacebookLoginComponent]
})
export class AccountModule { }
