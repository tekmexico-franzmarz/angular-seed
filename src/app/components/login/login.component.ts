import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
//import { AlertService } from '../../services/alerts/alert.service';

import * as io from "socket.io-client";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //message:any;
  loginForm: NgForm;
  @ViewChild('loginForm') currentForm: NgForm;
  credentials = { email: '', password: '' };
  isUser: any;
  socket = io('http://localhost:4000');

  ngAfterViewChecked() {
    this.formChanged();
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null) {
      this.getChatByRoom(user.room);
      this.msgData = { room: user.room, nickname: user.nickname, message: '' }
      this.joinned = true;
      this.scrollToBottom();
    }
    */
  }

  formChanged() {
    if (this.currentForm === this.loginForm) { return; }
    this.loginForm = this.currentForm;
    if (this.loginForm) {
      this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));
    }
  }
  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm.form;
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
    'email': ''
  };
  validationMessages = {
    'email': {
      'required': 'E-mail is required.',
      'pattern': 'Enter a valid e-mail address.'
    }
  };

  loginFn() {
    var date = new Date();
    if (!localStorage.getItem("user")) localStorage.setItem("user", "{}");
    localStorage.setItem("user", JSON.stringify(this.credentials));

    console.log("Credentials=> email=", this.credentials.email, " | password=", this.credentials.password);

    this.userService.auth(this.credentials.email, this.credentials.password)
      .subscribe(
      res => {
        this.isUser = res
        console.log("Is this person a registered user? ", this.isUser);
      },
      err => console.log("Error:", err),
      () => console.log('Done')
      )

  }

}
