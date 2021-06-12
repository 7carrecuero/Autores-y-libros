import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';

// Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './Shared/Services/auth.guard';
import { SharedModule } from './Shared/shared.module';
import { SpinnerServiceInterceptor } from './Commons/Services/spinnerService.interceptor';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { localStorageReducer } from './Store/LocalStorage/localStorage.reduce';
import { storageMetaReducer } from './Store/Classes/storage.metareducer';
import { environment } from '../environments/environment';
import { ProxyServiceInterceptor } from './Commons/Services/proxy.interceptor';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

registerLocaleData(localeFr, 'fr-FR');

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(
      { localStorage: localStorageReducer },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        },
        metaReducers: [storageMetaReducer]
      }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ProxyServiceInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerServiceInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: NgbDateAdapter,
      useClass: NgbDateNativeAdapter
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
