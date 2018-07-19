import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appSetting } from '../shared/models/app-settings';
import { ConfigService } from '../shared/config.service';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[];
  private appSetting: appSetting;

  constructor(http: HttpClient, private configService: ConfigService) {

    this.appSetting = configService.getAppSettings();

    http.get<WeatherForecast[]>(this.appSetting.apiUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
        this.forecasts = result;
      }, error => console.error(error));

  }
}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
