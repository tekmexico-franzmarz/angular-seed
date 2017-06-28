import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {LocationStrategy,HashLocationStrategy} from "@angular/common";
import {Routing} from "./app.routing";
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home/home.component';

import { ChatService } from './services/chat/chat.service';
import { ChatComponent } from './components/chat/chat.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { UserService } from './services/user/user.service';
import { ForbiddenNameDirective } from './directives/forbidden-name.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
    ForbiddenNameDirective
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy},ChatService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
