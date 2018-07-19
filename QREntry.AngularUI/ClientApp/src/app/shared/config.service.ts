import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ConfigService {

  _apiURI: string;
  _appSettings: appSetting;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._apiURI = 'http://localhost:5000/api';

    httpClient.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
      this._appSettings = result;
    }, error => console.error(error));
  }

  getApiURI() {
    return this._apiURI;
  }

  getAppSettings() {
    return this._appSettings;
  }

  getWebApiURL() {
    return this._appSettings.apiUrl;
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
