import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { MessageService } from './messages/message.service';
import { MessagesComponent } from './messages/messages.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';

import { ComputerManagementComponent } from './computer-management/computer-management.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'fetch-data', component: FetchDataComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'app-settings', component: AppSettingsComponent },
  { path: 'view-logs', component: MessagesComponent },
  { path: 'computer-management', loadChildren: 'app/computer-management/computer-management.module#ComputerManagementModule', }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        //enableTracing: true, // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    
  ]
})

export class AppRoutingModule { }
