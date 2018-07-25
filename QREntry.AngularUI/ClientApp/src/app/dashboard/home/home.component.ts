import { Component, OnInit } from '@angular/core';

import { HomeDetails } from '../models/home.details.interface';
import { DashboardService } from '../services/dashboard.service';
import { UserService } from '../../account/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeDetails: HomeDetails;

  constructor(private dashboardService: DashboardService, private userService: UserService) { }

  ngOnInit() {

    this.dashboardService.getHomeDetails()
    .subscribe((homeDetails: HomeDetails) => {
      this.homeDetails = homeDetails;
    },
    error => {
      //this.notificationService.printErrorMessage(error);
      });
    
  }

  logOut() {
    this.userService.logout();
  }

}
