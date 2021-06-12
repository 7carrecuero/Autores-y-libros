import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../Shared/Services/auth.guard";
import { AuthorsComponent } from "./Components/authors.component";

const AuthorsRoutes: Routes = [
    {
      path: 'Authors',
      canActivate : [AuthGuard],
      component: AuthorsComponent,
      data: {
        title: 'Libros',
        urls: [ { title: 'Administración > Autores', url: '/Authors' } ]
      }
    }
];

export const AUTHORS_ROUTES = RouterModule.forChild(AuthorsRoutes);