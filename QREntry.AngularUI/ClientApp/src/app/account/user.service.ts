import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:50446/';
  appSetting: appSetting;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
      this.appSetting = result;
    }, error => console.error(error));
}

  registerUser(user: User) {
    const body: User = {
      Location: user.Location,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }

    return this.http.post<number>(this.appSetting.apiUrl + 'api/Accounts/', body, httpOptions);

   // return this.http.post(this.appSetting.apiUrl + 'api/Accounts/', body);
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
