import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {LocationStrategy,HashLocationStrategy} from "@angular/common";
import {Routing} from "./app.routing";

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    Routing
  ],
  providers: [{provide:LocationStrategy,useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
