import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DateFormatPipe } from "../../../Shared/Pipes/dateFormatPipe";
import { StatusPipe } from "../../../Shared/Pipes/statusPipe";
import { SharedModule } from "../../../Shared/shared.module";
import { AUTHENTICATION_ROUTES } from "./authentication.routing";
import { LoginComponent } from "./Components/login.component";
import { AuthenticationFormsService } from "./Services/authentication.form.service";
import { AuthenticationService } from "./Services/authentication.service";

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      AUTHENTICATION_ROUTES,
      NgbModule,
      SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    exports:[
        LoginComponent
    ],
    providers: [
        AuthenticationService,
        StatusPipe,
        DateFormatPipe,
        AuthenticationFormsService      
    ]
  })
  
  export class AuthenticationModule {}