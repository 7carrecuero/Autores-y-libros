import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './Components/spinner.component';
import { MatAutocompleteModule, MatStepperModule, MatFormFieldModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BreadcrumbComponent } from './Components/Breadcrumb/breadcrumb.component';
import { NavigationComponent } from './Components/HeaderNavigation/navigation.component';
import { SidebarComponent } from './Components/Sidebar/sidebar.component';
import { FullComponent } from './Components/Layouts/Full/full.component';
import { BlankComponent } from './Components/Layouts/Blank/blank.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MessagesComponent } from './Components/Messages/messages.component';
import { ModalBasicComponent } from './Components/Modal/modal.component';
import { CellModule } from './Components/SmartTable/components/cell/cell.module';
import { FilterModule } from './Components/SmartTable/components/filter/filter.module';
import { TBodyModule } from './Components/SmartTable/components/tbody/tbody.module';
import { PagerModule } from './Components/SmartTable/components/pager/pager.module';
import { THeadModule } from './Components/SmartTable/components/thead/thead.module';
import { SmartTableComponent } from './Components/SmartTable/ng2-smart-table.component';
import { TrueFalseValueDirective } from './Directives/true-false-value-checkbox.directives';
import { SwiperModule } from './Components/Swipper/swiper.module';
import { CurrencyMaskDirective } from './Directives/currency-mask.directive';
import { DateFormatPipe } from './Pipes/dateFormatPipe';
import { StatusPipe } from './Pipes/statusPipe';
import { CurrencyFormatPipe } from './Pipes/currencyFormatPipe';
import { PortalTypePipe } from './Pipes/portalType.pipe';
import { MoneyformatPipe } from './Pipes/moneyFromat.pipe';
import { AutoCompleteComponent } from './Components/AutoComplete/auto-complete.component';
import { AlertsSyncComponent } from './Components/AlertsSync/alertsSync.component';
import { LoaderComponent } from './Components/Loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    PerfectScrollbarModule,
    TranslateModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    CellModule,
    FilterModule,
    PagerModule,
    TBodyModule,
    THeadModule,
    SwiperModule
  ],
  declarations: [
    SpinnerComponent,
    BreadcrumbComponent,
    NavigationComponent,
    SidebarComponent,
    FullComponent,
    BlankComponent,
    MessagesComponent,
    ModalBasicComponent,
    SmartTableComponent,
    TrueFalseValueDirective,
    CurrencyMaskDirective,
    MoneyformatPipe,
    DateFormatPipe,
    StatusPipe,
    PortalTypePipe,
    CurrencyFormatPipe,
    AutoCompleteComponent,
    AlertsSyncComponent,
    LoaderComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule,
    SpinnerComponent,
    BreadcrumbComponent,
    NavigationComponent,
    SidebarComponent,
    FullComponent,
    BlankComponent,
    RouterModule,
    PerfectScrollbarModule,
    MessagesComponent,
    ModalBasicComponent,
    SmartTableComponent,
    TrueFalseValueDirective,
    SwiperModule,
    CurrencyMaskDirective,
    MoneyformatPipe,
    DateFormatPipe,
    StatusPipe,
    PortalTypePipe,
    CurrencyFormatPipe,
    TBodyModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    AutoCompleteComponent,
    AlertsSyncComponent,
    LoaderComponent
  ],
  providers: [
    TranslateService,
  ]
})
export class SharedModule { }
