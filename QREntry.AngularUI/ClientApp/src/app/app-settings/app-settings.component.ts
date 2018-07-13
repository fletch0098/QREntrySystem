import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})

export class AppSettingsComponent {

  private appSetting: appSetting;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
      this.appSetting = result;

    }, error => console.error(error));
  }
}

interface appSetting {
  enviroment: string;
  appName: string;
  url: string;
  apiUrl: string;
  appTitle: string;
  version: string;
}
