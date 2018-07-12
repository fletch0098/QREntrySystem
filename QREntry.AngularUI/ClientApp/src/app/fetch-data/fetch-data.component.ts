import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  private appSetting: appSetting;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
      this.appSetting = result;

      http.get<WeatherForecast[]>(this.appSetting.apiUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));

    }, error => console.error(error));
  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface appSetting {
  enviroment: string;
  appName: string;
  url: string;
  apiUrl: string;
}
