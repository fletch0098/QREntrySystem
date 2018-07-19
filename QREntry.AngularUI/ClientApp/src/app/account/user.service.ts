import { Injectable, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';

import { BaseService } from "../shared/base.service";
import { ConfigService } from '../shared/config.service';
import { UserRegistration } from '../shared/models/user-registration';

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

import { User } from './user.model';

import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class UserService extends BaseService {
  readonly rootUrl = 'http://localhost:50446/';
  appSetting: appSetting;

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  private baseUrl: string;

  constructor(private httpClient: HttpClient, private http: Http, @Inject('BASE_URL') baseUrl: string, private configService: ConfigService) {
    super();

    httpClient.get<appSetting>(baseUrl + 'api/appSetting/getAppSettings').subscribe(result => {
      this.appSetting = result;
    }, error => console.error(error));

    
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getWebApiURL();

}

  registerUser(user: User) {
    const body: User = {
      Location: user.Location,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }

    return this.httpClient.post(this.appSetting.apiUrl + 'api/Accounts/', body, httpOptions)
      .map(res => true);
  }

    register(email: string, password: string, firstName: string, lastName: string, location: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName, location });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/accounts", body, options)
      .map(res => true)
      .catch(this.handleError);
  }

  login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.baseUrl + '/auth/login',
        JSON.stringify({ userName, password }), { headers }
      )
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  facebookLogin(accessToken: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });
    return this.http
      .post(
        this.baseUrl + '/externalauth/facebook', body, { headers })
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      })
      .catch(this.handleError);
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
