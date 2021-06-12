import { Cell } from './cell';
import { Column } from './column';
import { DataSet } from './data-set';

export class Row {

  isSelected = false;
  isInEditing = false;
  cells: Array<Cell> = [];


  constructor(public index: number, protected data: any, protected _dataSet: DataSet) {
    this.process();
  }

  getCell(column: Column): Cell {
    return this.cells.find(el => el.getColumn() === column);
  }

  getCells() {
    return this.cells;
  }

  getData(): any {
    return this.data;
  }

  getIsSelected(): boolean {
    return this.isSelected;
  }

  getNewData(): any {
    const values = Object.assign({}, this.data);
    this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
    return values;
  }

  setData(data: any): any {
    this.data = data;
    this.process();
  }

  process() {
    this.cells = [];
    this._dataSet.getColumns().forEach((column: Column) => {
      const cell = this.createCell(column);
      this.cells.push(cell);
    });
  }

  createCell(column: Column): Cell {
    const defValue = (column as any).settings.defaultValue ? (column as any).settings.defaultValue : '';
    let value: any;
    if (column.id.split('.').length === 1) {
      value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];
    } else {
      value = typeof this.data[column.id.split('.')[0]] === 'undefined'
        ? defValue : this.data[column.id.split('.')[0]][column.id.split('.')[1]];
    }

    return new Cell(value, this, column, this._dataSet);
  }
}
