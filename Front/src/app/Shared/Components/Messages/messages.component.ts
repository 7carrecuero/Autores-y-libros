import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'component-messages',
  templateUrl: './messages.component.html'
})

export class MessagesComponent {

    @ViewChild('buttonMessage', {static: false}) buttonMessage: ElementRef;
    visibleMessage: boolean = false;
    message: string;
    type: string;

    constructor() {

    }

    showMessages(message: string, type: string){
        this.message = message;
        this.type = type;
        this.visibleMessage = true; 
        setTimeout(() => {
            this.buttonMessage.nativeElement.focus();
        }, 0)
        setTimeout(() => {
            this.closeMessage();
        }, 5000)
    }

    closeMessage(){
        this.visibleMessage = false;
    }

}



