import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Globals } from './globals';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessageService } from './messages/message.service';
import { MessagesComponent } from './messages/messages.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { UserService } from './account/user.service';
import { BaseService } from './shared/base.service';
import { ConfigService } from './shared/config.service';
import { LoginFormComponent } from './account/login-form/login-form.component';
import { LoginComponent } from './account/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    MessagesComponent,
    FooterComponent,
    AppSettingsComponent,
    SignUpComponent,
    LoginFormComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule


  ],
  providers: [MessageService, Globals, UserService, ConfigService],
  bootstrap: [AppComponent]
})

export class AppModule {
  // Diagnostic only: inspect router configuration
  //constructor(router: Router) {
  //  console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  //}
}
