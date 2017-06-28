import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { forbiddenNameValidator } from '../../directives/forbidden-name.directive';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  model: any = {};
  loading: boolean = false;

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group({
      'fullName': [this.model.fullName,
      [Validators.required,
      Validators.minLength(3),
      forbiddenNameValidator(/admin/i)]
      ],
      'email': [this.model.email,
      [Validators.required,
      Validators.email]
      ],
      'passwords': this.fb.group({
        'password': [this.model.password]
        ,
        'confirmPassword': [this.model.confirmPassword],
      },  { validator: this.areEqual })
    });

    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged());

    this.onValueChanged();
  }
  areEqual(group: FormGroup) {
    let res={};
    let password = group.get('password').value; // to get value in input tag
    let confirmPassword = group.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      res["areEqual"]=true;
    } else if(password && password.length<6){
      res["minlength"]=true;
    }
    else {
      return null
    }
    return res;
  }

  register() {
    this.loading = true;
    this.userService.createUser(this.model)
      .subscribe(
      data => {
        this.router.navigate(['login']);
      },
      error => { this.loading = false; console.log(error) },
      () => console.log("Done")
      )
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'fullName': '',
    'email': '',
    'passwords': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 3 characters long.',
      'forbiddenName': '"Admin" is not a valid name.'
    },
    'email': {
      'required': 'E-mail is required.',
      'email': 'Enter a valid e-mail address.'
    },
    'passwords': {
      'areEqual': 'Passwords must match',
      'minlength': "Password must be at least 6 characters long."
    }
  };
}
