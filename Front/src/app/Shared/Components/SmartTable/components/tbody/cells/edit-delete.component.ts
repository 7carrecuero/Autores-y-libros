import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy, Directive, OnInit, ElementRef } from '@angular/core';

import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { DataSource } from '../../../lib/data-source/data-source';

@Component({
  selector: 'ng2-st-tbody-edit-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a href="#" *ngIf="isActionEdit" title="{{editTitle | translate}}" class="ng2-smart-action ng2-smart-action-edit-edit"
        [innerHTML]="editRowButtonContent" (click)="onEdit($event)"></a>
    <a href="#" *ngIf="isActionDelete" title="{{deleteTitle | translate}}" class="ng2-smart-action ng2-smart-action-delete-delete"
        [innerHTML]="deleteRowButtonContent" (click)="onDelete($event)"></a>
    <a href="#" *ngIf="isActionCopy" title="{{copyTitle | translate}}" class="ng2-smart-action ng2-smart-action-edit-edit"
        [innerHTML]="copyRowButtonContent" (click)="onCopy($event)"></a>
  `,
})
export class TbodyEditDeleteComponent implements OnChanges {

  constructor() {
    this.editTitle = 'general.edit';
    this.copyTitle = 'general.copy';
    this.deleteTitle = 'general.delete';
  }

  @Input() grid: Grid;
  @Input() row: Row;
  @Input() source: DataSource;
  @Input() deleteConfirm: EventEmitter<any>;
  @Input() editConfirm: EventEmitter<any>;
  @Input() copyConfirm: EventEmitter<any>;
  @Input() actionEditId: number;
  @Input() actionDeleteId: number;
  @Input() actionCopyId: number;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() copy = new EventEmitter<any>();
  @Output() editRowSelect = new EventEmitter<any>();

  isActionEdit: boolean;
  isActionDelete: boolean;
  isActionCopy = true;
  editRowButtonContent: string;
  deleteRowButtonContent: string;
  copyRowButtonContent: string;
  editTitle: string;
  copyTitle: string;
  deleteTitle: string;

  onEdit(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.editRowSelect.emit(this.row);

    if (this.grid.getSetting('mode') === 'external') {
      this.edit.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.edit(this.row);
    }
  }

  onDelete(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.grid.getSetting('mode') === 'external') {
      this.delete.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.delete(this.row, this.deleteConfirm);
    }
  }

  onCopy(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.grid.getSetting('mode') === 'external') {
      this.copy.emit({
        data: this.row.getData(),
        source: this.source,
      });
    } else {
      this.grid.copy(this.row, this.copyConfirm);
    }
  }

  ngOnChanges() {
    this.isActionEdit = this.grid.getSetting('actions.edit');
    this.isActionDelete = this.grid.getSetting('actions.delete');
    this.isActionCopy = this.grid.getSetting('actions.copy');
    this.editRowButtonContent = this.grid.getSetting('edit.editButtonContent');
    this.deleteRowButtonContent = this.grid.getSetting('delete.deleteButtonContent');
    this.copyRowButtonContent = this.grid.getSetting('copy.copyRowButtonContent');
  }
}
