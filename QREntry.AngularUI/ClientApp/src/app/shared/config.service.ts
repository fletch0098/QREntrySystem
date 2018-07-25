import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { appSetting } from '../shared/models/app-settings';

@Injectable()
export class ConfigService {

  _appSettings: appSetting;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    //httpClient.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
    //  this._appSettings = result;
    //}, error => console.error(error));
  }

  loadConfig() {
    return this.httpClient.get<appSetting>(this.baseUrl + 'api/appSetting/getAppSettings')
      .toPromise()
      .then(result => {
        this._appSettings = result;
      }, error => console.error(error));
  }

  getApiURI() {
    return this._appSettings.apiUrl + 'api';
  }

  getAppSettings() {
    console.log('Get App Settings Called');
    return this._appSettings;
  }

  getWebApiURL() {
    return this._appSettings.apiUrl;
  }

  getMyURL() {

  }

}
