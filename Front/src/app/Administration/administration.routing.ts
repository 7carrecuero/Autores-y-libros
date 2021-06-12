import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from '../Shared/Components/Layouts/Blank/blank.component';
import { AuthGuard } from '../Shared/Services/auth.guard';
import { FullComponent } from '../Shared/Components/Layouts/Full/full.component';

const AministrationRoutes: Routes = [
    {
      path: '',
      // component: FullComponent,
      loadChildren: () => import('./Components/Authentication/authentication.module').then(module => module.AuthenticationModule)
    },
    {
      path: 'Administration',
      component: FullComponent,
      loadChildren: () => import('./Components/Authors/authors.module').then(module => module.AuthorsModule)
    },
    {
      path: 'Administration',
      component: FullComponent,
      loadChildren: () => import('./Components/Books/books.module').then(module => module.BooksModule)
    },
    {
      path: 'Administration',
      component: FullComponent,
      loadChildren: () => import('./Components/SyncUp/syncUp.module').then(module => module.SyncUpModule)
    },
];

export const ADMINISTRATION_ROUTES = RouterModule.forChild(AministrationRoutes);