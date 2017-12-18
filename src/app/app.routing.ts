import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './core/form.component';
import {TableComponent} from './core/table.component';
import {NotFoundComponent} from './core/notFound.component';
import {TermsGuard} from './terms.guard';
import {UnsavedGuard} from './core/unsaved.guard';


const routes: Routes = [
  {path: '', redirectTo: '/table', pathMatch: 'full'},
  {
    path: 'form/:mode/:id', component: FormComponent,
    canDeactivate: [UnsavedGuard]
  },
  {
    path: 'form/:mode', component: FormComponent,
    canActivate: [TermsGuard]
  },
  {path: 'table', component: TableComponent},
  {path: '**', component: NotFoundComponent}
];

export const routing = RouterModule.forRoot(routes);
