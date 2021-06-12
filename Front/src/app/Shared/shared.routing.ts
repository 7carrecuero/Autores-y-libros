import { Routes, RouterModule  } from '@angular/router';
import { FullComponent } from './Components/Layouts/Full/full.component';
import { AuthGuard } from './Services/auth.guard';

const SharedRoutes: Routes = [
  {
  }
];

export const SHARED_ROUTES = RouterModule.forChild(SharedRoutes);
