import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "../../../../../environments/environment";
import { Result } from "../../../../Commons/Classes/result";
import { Books } from "../../../../Commons/Entities/books";
import { MessagesComponent } from "../../../../Shared/Components/Messages/messages.component";
import { ModalBasicComponent } from "../../../../Shared/Components/Modal/modal.component";
import { SmartTableComponent } from "../../../../Shared/Components/SmartTable/ng2-smart-table.component";
import { GetBooksFiltersIn } from "../MethodParameters/getBooksFiltersIn";
import { BooksFormsService } from "../Services/books.form.service";
import { BooksService } from "../Services/books.service";

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
  })  
export class BooksComponent implements OnInit {
    @ViewChild('createModal', { static: false }) createModal: ModalBasicComponent;
    @ViewChild('messages', { static: false }) messages: MessagesComponent;
    @ViewChild('smartTable', { static: false }) smartTable: SmartTableComponent;
    booksList: Array<Books> = new Array<Books>();
    collapsed = false;
    hasError = false;
    totalRecords = 0;
    settings: any;
    showLoader: boolean = false;
    filterForm: FormGroup;
    maxDate: any;
    minDate:any = environment.minDate;

    events: any = {
        eventAlertModal: {},
        eventGrid: {}
      };

    constructor(private booksService: BooksService, private booksFormsService:BooksFormsService){}

    ngOnInit() {
        this.settings = this.booksFormsService.getConfigDataTable(false);
        this.filterForm = this.booksFormsService.getFilterForm();
        this.getBooksFilters(1);
    }

    getCurrentDate() {
        const date = new Date;
        let currentDay = date.getDate();
        let currentMonth = (date.getMonth() + 1);
        let currentYear = date.getFullYear();
        this.maxDate = { year: currentYear, month: currentMonth, day: currentDay };
    }

    changePage($event: any) {
        this.getBooksFilters($event.$event.page);
    }

    sortDataTable(event: any) {
        this.getBooksFilters(this.smartTable.pager.getPage());
    }

    contentReady = (e) => {
        if(!this.collapsed) {
            this.collapsed = true;
            e.component.expandRow(["EnviroCare"]);
        }
      };

    getBooksFilters(pageNumber: number = 1, orderBy: string = '', orderDirection: string = ''){
        this.showLoader = true;
        let getBooksFiltersIn = new GetBooksFiltersIn();
        getBooksFiltersIn.initialDate = this.filterForm.get('filterFileDateStart').value;
        getBooksFiltersIn.endDate = this.filterForm.get('filterFileDateEnd').value;
        getBooksFiltersIn.pageSize = environment.pageSize;
        getBooksFiltersIn.pageNumber = pageNumber;
        getBooksFiltersIn.orderBy = orderBy;
        getBooksFiltersIn.orderDirection = orderDirection;
        this.booksService.getBooksFilters(getBooksFiltersIn).subscribe(response => {
            if(response.result === Result.Success){
                this.booksList = response.booksByAuthors;
                this.totalRecords = response.totalRecords;
            }
            this.showLoader = false;
        });
    }
}