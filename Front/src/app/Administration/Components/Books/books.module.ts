import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DateFormatPipe } from "../../../Shared/Pipes/dateFormatPipe";
import { StatusPipe } from "../../../Shared/Pipes/statusPipe";
import { SharedModule } from "../../../Shared/shared.module";
import { BOOKS_ROUTES } from "./books.routing";
import { BooksComponent } from "./Components/books.component";
import { BooksFormsService } from "./Services/books.form.service";
import { BooksService } from "./Services/books.service";

@NgModule({
    imports: [
      RouterModule,
      CommonModule,
      BOOKS_ROUTES,
      NgbModule,
      SharedModule
    ],
    declarations: [
        BooksComponent
    ],
    exports:[
        BooksComponent
    ],
    providers: [
        BooksService,
      StatusPipe,
      DateFormatPipe,
      BooksFormsService      
    ]
  })
  
  export class BooksModule {}