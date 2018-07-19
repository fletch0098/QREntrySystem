import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { UserRegistration } from '../../shared/models/user-registration';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit{

  //@Input() model: User = new User();

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
    private router: Router

  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm() {

    //this.model = {
    //  Email: '',
    //  Password: '',
    //  Location: '',
    //  FirstName: '',
    //  LastName: ''
    //}
  }

  onSubmit() {

    //console.log(this.model.Email);
    //console.log(this.model);

    

    //this.userService.registerUser(this.model)
    //  .subscribe((data: any) => {
    //    if (data.Succeeded == true) {
    //      this.resetForm();
    //      //Success
    //    }
    //    else {
    //      //Error
    //    }
    //  });

      //this.userService.registerUser(this.model)
      //  .subscribe(() => this.goBack());

    //var value: UserRegistration;
    //value.email = this.model.Email;
    //value.firstName = this.model.FirstName;
    //value.lastName = this.model.LastName;
    //value.location = this.model.Location;
    //value.password = this.model.Password;

    //var valid: boolean;
    //valid = true;

    //this.registerUser({ value, valid});
 
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password, value.firstName, value.lastName, value.location)
        .finally(() => this.isRequesting = false)
        .subscribe(
          result => {
            if (result) {
              this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          },
          errors => this.errors = errors);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
