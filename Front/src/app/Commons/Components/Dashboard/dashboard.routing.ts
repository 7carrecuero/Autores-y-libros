import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Components/dashboard.component';

const DashboardRoutes: Routes = [
  {
    path: '',
    data: {
      title: 'route.breadcrumb.commons.dashboard.title',
      urls: [
        { title: 'route.breadcrumb.commons.dashboard.url', url: '/dashboard' },
        { title: 'route.breadcrumb.commons.dashboard.url' }
      ]
    },
    component: DashboardComponent
  }
];

export const DASHBOARD_ROUTES = RouterModule.forChild(DashboardRoutes);
