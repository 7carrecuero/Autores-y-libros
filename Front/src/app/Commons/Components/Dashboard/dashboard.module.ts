import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { DashboardComponent } from './Components/dashboard.component';
import { SharedModule } from '../../../Shared/shared.module';

@NgModule({
  imports: [
    DASHBOARD_ROUTES,
    SharedModule
  ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class DashboarModule { }
