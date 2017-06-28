import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chat', component: ChatComponent }
];

export const Routing = RouterModule.forRoot(routes);
