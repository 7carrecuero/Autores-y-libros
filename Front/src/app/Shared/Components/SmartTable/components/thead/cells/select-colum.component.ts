import { Component, Input, AfterViewInit, ElementRef, OnChanges, ViewChild } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { ModalBasicComponent } from '../../../../Modal/modal.component';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: '[ng2-st-select-colum]',
  templateUrl: './select-colum.component.html',
})
export class SelectColumComponent implements AfterViewInit, OnChanges {

  @Input() grid: Grid;
  @ViewChild('modalContent', { static: false }) modalContent: ModalBasicComponent;
  closeMessage = 'general.buttons.close';
  acceptMessage = 'general.buttons.accept';
  titleModal: string;
  columnsTitleModal: string;
  columnsVisibleTitleModal: string;
  modalref: NgbModalRef;

  actionsColumnTitle: string;

  constructor(private ref: ElementRef, private modalService: NgbModal) {
    this.closeMessage = 'general.buttons.close';
    this.acceptMessage = 'general.buttons.accept';
    this.columnsTitleModal = 'general.columnsDisablemodal.columns';
    this.columnsVisibleTitleModal = 'general.columnsDisablemodal.visibility';
  }

  ngAfterViewInit() {
    this.ref.nativeElement.classList.add('ng2-smart-actions');
  }

  ngOnChanges() {
    this.actionsColumnTitle = this.grid.getSetting('actions.columnTitle');
  }

  openModal() {
    this.modalref = this.modalService.open(this.modalContent, { size: 'sm' });
  }

  acceptModal() {
    this.modalref.close();
  }

  closeModal() {
    this.modalref.close();
  }

}
