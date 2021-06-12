import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../Shared/Services/auth.guard";
import { BooksComponent } from "./Components/books.component";

const BooksRoutes: Routes = [
    {
      path: 'Books',
      canActivate : [AuthGuard],
      component: BooksComponent,
      data: {
        title: 'Libros',
        urls: [ { title: 'Administración > Libros', url: '/Books' } ]
      }
    }
];

export const BOOKS_ROUTES = RouterModule.forChild(BooksRoutes);