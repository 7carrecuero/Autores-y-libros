import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../Shared/Services/auth.guard";
import { SyncUpComponent } from "./Components/syncUp.component";

const SyncUpRoutes: Routes = [
    {
      path: 'SyncUp',
      canActivate : [AuthGuard],
      component: SyncUpComponent,
      data: {
        title: 'Sincronización',
        urls: [ { title: 'Administración > Sincronizar', url: '/SyncUp' } ]
      }
    }
];

export const SYNCUP_ROUTES = RouterModule.forChild(SyncUpRoutes);