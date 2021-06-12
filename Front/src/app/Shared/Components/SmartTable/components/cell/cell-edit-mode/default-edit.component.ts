import { Component } from '@angular/core';

import { EditCellDefault } from './edit-cell-default';
import { Cell } from '../../../lib/data-set/cell';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'table-cell-default-editor',
  templateUrl: './default-edit.component.html',
})
export class DefaultEditComponent extends EditCellDefault {

  constructor() {
    super();
  }

  getEditorType(): string {
    return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
  }
}
