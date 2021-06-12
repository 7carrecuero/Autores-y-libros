import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
    selector: 'component-alertsSync',
    templateUrl: './alertsSync.component.html'
  })
  
  export class AlertsSyncComponent {
    hasError:boolean = false;
    title:string = "";
    syncActive:boolean = false;

    @Input() set syncActiveInput(item: boolean) {
        this.syncActive = item;
    }

    get syncActiveInput(): boolean {
        return this.syncActive;
    }

    @Input() set hasErrorInput(item: boolean) {
        this.hasError = item;
    }

    get hasErrorInput(): boolean {
        return this.hasError;
    }

    @Input() set titleInput(item: string) {
        this.title = item;
    }

    get titleInput(): string {
        return this.title;
    }
  
      constructor() {
  
      }
}
