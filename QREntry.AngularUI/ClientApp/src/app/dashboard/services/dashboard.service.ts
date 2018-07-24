import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HomeDetails } from '../models/home.details.interface'; 
import { ConfigService } from '../../shared/config.service';

import {BaseService} from '../../shared/base.service';

import { Observable } from 'rxjs/Rx'; 

// Add the RxJS Observable operators we need in this app.
import '../../rxjs-operators';

@Injectable()

export class DashboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
      //let headers = new Headers();
      //headers.append('Content-Type', 'application/json');

    let headers = new Headers();
    
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);
    headers.append('Content-Type', `application/json`);

    let options = new RequestOptions({ headers: headers });

    console.log('getHomeDetails');

    console.log(this.baseUrl + '/dashboard/home');
    console.log(options);

    return this.http.get(this.baseUrl + "/dashboard/home",options)
      .map(response => response.json())
      .catch(this.handleError);
  }  
}
