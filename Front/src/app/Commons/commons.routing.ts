
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/Services/auth.guard';
import { FullComponent } from '../Shared/Components/Layouts/Full/full.component';

const SharedRoutes: Routes = [
  {
    path: 'Dashboard',
    component: FullComponent,
    loadChildren: () => import('./Components/Dashboard/dashboard.module').then(module => module.DashboarModule)
  }
];

export const COMMONS_ROUTES = RouterModule.forChild(SharedRoutes);
