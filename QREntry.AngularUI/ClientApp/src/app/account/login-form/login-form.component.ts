import { Component, OnInit, Input } from '@angular/core';
import { Credentials } from '../credentials.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  @Input() model: Credentials;

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location
  ) { }

  ngOnInit() {
    
  }

  onSubmit() {

    console.log(this.model.Email);
    console.log(this.model);

    //this.userService.addComputer(this.model)
    //    .subscribe(() => this.goBack());
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  goBack(): void {
    this.location.back();
  }

}
