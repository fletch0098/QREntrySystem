import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appSetting } from '../shared/models/app-settings';
import { ConfigService } from '../shared/config.service';

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.css']
})

export class AppSettingsComponent {

  appSetting: appSetting;

  constructor(private configService: ConfigService ) {
    this.appSetting = configService.getAppSettings();
  }
}
