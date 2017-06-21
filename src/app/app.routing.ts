import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './components/root-component/app.component';

const routes: Routes = [
  { path: '', component: AppComponent }
];

export const Routing = RouterModule.forRoot(routes);
