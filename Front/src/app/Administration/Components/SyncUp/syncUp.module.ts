import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../../Shared/shared.module";
import { SyncUpComponent } from "./Components/syncUp.component";
import { SyncUpService } from "./Services/syncUp.service";
import { SYNCUP_ROUTES } from "./syncUp.routing";

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      SYNCUP_ROUTES,
      NgbModule,
      SharedModule
    ],
    declarations: [
        SyncUpComponent
    ],
    exports:[
        SyncUpComponent
    ],
    providers: [
      SyncUpService    
    ]
  })
  
  export class SyncUpModule {}