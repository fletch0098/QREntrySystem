import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent{

  @Input() model: User = new User();

  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,

  ) { }

  onSubmit() {

    console.log(this.model.Email);
    console.log(this.model);

      this.userService.registerUser(this.model)
        .subscribe(() => this.goBack());
 
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  goBack(): void {
    this.location.back();
  }
}
