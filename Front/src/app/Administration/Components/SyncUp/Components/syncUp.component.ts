import { Component, OnInit, ViewChild } from "@angular/core";
import { Result } from "../../../../Commons/Classes/result";
import { AlertsSyncComponent } from "../../../../Shared/Components/AlertsSync/alertsSync.component";
import { ModalBasicComponent } from "../../../../Shared/Components/Modal/modal.component";
import { GetSynchronizationIn } from "../MethodParameters/getSynchronizationIn";
import { SyncUpService } from "../Services/syncUp.service";

@Component({
    selector: 'app-syncUp',
    templateUrl: './syncUp.component.html',
    styleUrls: ['./syncUp.component.css']
  })  
export class SyncUpComponent implements OnInit {
    hasBooksError:boolean = false;
    hasAuthorsError:boolean = false;
    syncActive:boolean = false;
    @ViewChild('AlertsSyncBooks', { static: false }) AlertsSyncBooks: AlertsSyncComponent;
    @ViewChild('AlertsSyncAuthors', { static: false }) AlertsSyncAuthors: AlertsSyncComponent;
    @ViewChild('resultModal', { static: false }) resultModal: ModalBasicComponent;
    showLoader: boolean = false;

    constructor(private syncUpService: SyncUpService){}

    ngOnInit() {
   
    }

    getAuthorsFilters(){
        this.showLoader = true;
        let getSynchronizationIn = new GetSynchronizationIn();
        this.syncUpService.getSynchronization(getSynchronizationIn).subscribe(response => {
            this.syncActive = true;
            if(response.result === Result.Success){
                if(response.resultBooks === Result.Success){
                    this.hasBooksError = false;
                }else{
                    this.hasBooksError = true;
                }
                if(response.resultAuthors === Result.Success){
                    this.hasAuthorsError = false;
                }else{
                    this.hasAuthorsError = true;
                }
            }
            this.resultModal.open();
            this.showLoader = false;
        });
    }

    closeModal(){
        this.resultModal.closeModal();
    }
}