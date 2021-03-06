import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PagerComponent } from './pager.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  declarations: [
    PagerComponent,
  ],
  exports: [
    PagerComponent,
  ]
})
export class PagerModule { }
