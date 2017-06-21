import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './components/root-component/app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }
];

export const Routing = RouterModule.forRoot(routes);
