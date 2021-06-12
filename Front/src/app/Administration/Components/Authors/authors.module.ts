import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DxButtonModule, DxDataGridModule, DxTemplateModule, DxBulletModule } from "devextreme-angular";
import { DateFormatPipe } from "../../../Shared/Pipes/dateFormatPipe";
import { StatusPipe } from "../../../Shared/Pipes/statusPipe";
import { SharedModule } from "../../../Shared/shared.module";
import { AUTHORS_ROUTES } from "./authors.routing";
import { AuthorsComponent } from "./Components/authors.component";
import { AuthorsFormsService } from "./Services/authors.form.service";
import { AuthorsService } from "./Services/authors.service";

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      AUTHORS_ROUTES,
      NgbModule,
      SharedModule,
      DxButtonModule,
      DxDataGridModule,
      DxTemplateModule,
      DxBulletModule
    ],
    declarations: [
      AuthorsComponent
    ],
    exports:[
      AuthorsComponent
    ],
    providers: [
      AuthorsService,
      StatusPipe,
      DateFormatPipe,
      AuthorsFormsService      
    ]
  })
  
  export class AuthorsModule {}