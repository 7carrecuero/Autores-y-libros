import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./Components/login.component";

const AuthenticationRoutes: Routes = [
    {
      path: 'Login',
      component: LoginComponent,
      data: {
        title: 'Libros',
        urls: [ { title: 'Authentication', url: '/Login' } ]
      }
    }
];

export const AUTHENTICATION_ROUTES = RouterModule.forChild(AuthenticationRoutes);