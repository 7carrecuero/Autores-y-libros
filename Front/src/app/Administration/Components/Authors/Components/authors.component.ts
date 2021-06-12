import { Component, OnInit, ViewChild } from "@angular/core";
import { environment } from "../../../../../environments/environment";
import { BlobHelper } from "../../../../Commons/Classes/blobHelper";
import { Result } from "../../../../Commons/Classes/result";
import { Authors } from "../../../../Commons/Entities/authors";
import { MessagesComponent } from "../../../../Shared/Components/Messages/messages.component";
import { ModalBasicComponent } from "../../../../Shared/Components/Modal/modal.component";
import { SmartTableComponent } from "../../../../Shared/Components/SmartTable/ng2-smart-table.component";
import { GetAuthorsFiltersIn } from "../MethodParameters/getAuthorsFiltersIn";
import { GetAuthorsReportIn } from "../MethodParameters/getAuthorsReportIn";
import { AuthorsFormsService } from "../Services/authors.form.service";
import { AuthorsService } from "../Services/authors.service";

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.css']
  })  
export class AuthorsComponent implements OnInit {
    @ViewChild('createModal', { static: false }) createModal: ModalBasicComponent;
    @ViewChild('messages', { static: false }) messages: MessagesComponent;
    @ViewChild('smartTable', { static: false }) smartTable: SmartTableComponent;
    authorsList: Array<Authors> = new Array<Authors>();
    collapsed = false;
    hasError = false;
    totalRecords = 0;
    settings: any;
    showLoader: boolean = false;

    events: any = {
        eventAlertModal: {},
        eventGrid: {}
      };

    constructor(private authorsService: AuthorsService, private authorsFormsService:AuthorsFormsService){}

    ngOnInit() {
        this.settings = this.authorsFormsService.getConfigDataTable(false);
        this.getAuthorsFilters(1);
    }

    changePage($event: any) {
        this.getAuthorsFilters($event.$event.page);
    }

    sortDataTable(event: any) {
        this.getAuthorsFilters(this.smartTable.pager.getPage());
    }

    contentReady = (e) => {
        if(!this.collapsed) {
            this.collapsed = true;
            e.component.expandRow(["EnviroCare"]);
        }
      };

    getAuthorsFilters(pageNumber: number = 1, orderBy: string = '', orderDirection: string = ''){
        this.showLoader = true;
        let getAuthorsFiltersIn = new GetAuthorsFiltersIn();
        getAuthorsFiltersIn.pageSize = environment.pageSize;
        getAuthorsFiltersIn.pageNumber = pageNumber;
        getAuthorsFiltersIn.orderBy = orderBy;
        getAuthorsFiltersIn.orderDirection = orderDirection;
        this.authorsService.getAuthorsFilters(getAuthorsFiltersIn).subscribe(response => {
            if(response.result === Result.Success){
                this.authorsList = response.Authors;
                this.totalRecords = response.totalRecords;
            }
            this.showLoader = false;
        });
    }

    getAuthorsReport(){
        this.showLoader = true;
        let getAuthorsReportIn = new GetAuthorsReportIn();
        this.authorsService.getAuthorsReport(getAuthorsReportIn).subscribe(response => {
            if(response.result === Result.Success){
                const mediaType = 'application/xls';
                const filename = 'AuthorsReport';
                const blob = BlobHelper.buildBlob(response.report, 'xls');
                BlobHelper.downloadBlob(blob, filename, mediaType, 'xls');
                this.getAuthorsFilters();
            }
            this.showLoader = false;
        });
    }
}