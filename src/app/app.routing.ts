import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: '/ondemand', pathMatch: 'full'},
  {path: 'ondemand', loadChildren: 'app/ondemand/ondemand.module#OndemandModule'}
];

export const routing = RouterModule.forRoot(routes);
