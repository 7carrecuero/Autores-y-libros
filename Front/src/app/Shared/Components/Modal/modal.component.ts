import { Component, ViewEncapsulation, Input, ViewChild, ElementRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'id-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .modal-max-width .modal-lg {
      max-width: 95%;
    }
    .dark-modal .modal-content {
      backdrop : 'static';
      background-color: #009efb;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
  `]
})

export class ModalBasicComponent {
  closeResult: string;
  @Input() styles = {};
  @Input() size: any = 'lg';
  @Input() windowClass = '';
  @Input() showButtons: boolean;
  @Input() title = 'title';
  @Input() allContent = false;
  @Input() closeMessage = 'general.buttons.close';
  @Input() acceptMessage = 'general.buttons.accept';
  @Input() closeModalInAcceptEvent = true;
  @Input() backdrop = 'static';
  @ViewChild('modalContent', { static: false }) modalContent: ElementRef;
  @Input() template: TemplateRef<any>;
  @Output() close = new EventEmitter<boolean>();
  @Output() dismiss = new EventEmitter<boolean>();
  @Output() accept = new EventEmitter<boolean>();
  modalref: NgbModalRef;
  ngbModalOptions: NgbModalOptions;

  constructor(private modalService: NgbModal) {}

  open() {
    this.ngbModalOptions = {
      size: this.size,
      windowClass: this.windowClass,
      centered: true,
      backdrop: 'static',
      keyboard : false
    };
    if (this.windowClass === 'modal-xl') {
      this.ngbModalOptions.windowClass = 'modal-max-width';
    }
    if (this.backdrop !== 'static') {
      this.ngbModalOptions.backdrop = false;
    }
    this.modalref = this.modalService.open(this.modalContent, this.ngbModalOptions);
    this.modalref.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.dismissModal();
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  closeModal() {
    this.modalref.close();
    this.close.emit();
  }

  acceptModal() {
    if (this.closeModalInAcceptEvent) {
      this.closeModal();
    }
    this.accept.emit();
  }

  dismissModal() {
    this.modalref.close();
    this.dismiss.emit();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}




