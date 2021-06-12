import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './Shared/Services/auth.guard';
import { FullComponent } from './Shared/Components/Layouts/Full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
  },
  {
    path: '',
    loadChildren: () => import('./Administration/administration.module').then(module => module.AdministrationModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
