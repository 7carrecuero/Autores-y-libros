import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ADMINISTRATION_ROUTES } from "./administration.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../Shared/shared.module";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ADMINISTRATION_ROUTES,
        NgbModule,
        SharedModule,
    ],
    exports:[
        FormsModule,       
        TranslateModule, 
        ReactiveFormsModule
    ],
    providers: [     
      
    ]
  })
  
  export class AdministrationModule {}