import { Component, Input, Output, SimpleChange, EventEmitter, OnChanges, ViewChild, OnInit } from '@angular/core';

import { Grid } from './lib/grid';
import { DataSource } from './lib/data-source/data-source';
import { Row } from './lib/data-set/row';
import { deepExtend } from './lib/helpers';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { PagerComponent } from './components/pager/pager.component';

@Component({
  selector: 'smart-table',
  styleUrls: ['./ng2-smart-table.component.scss'],
  templateUrl: './ng2-smart-table.component.html',
})
export class SmartTableComponent implements OnInit, OnChanges {

  @Input() source: any;
  @Input() settings: Object = {};
  @Input() rowCount = 0;
  @Input() labelTotalRecords = 'Total de registros';
  @Input() labelNoRecords = 'No se encontraron registros';
  @Input() actionEditId: number;
  @Input() actionDeleteId: number;
  @Input() actionCopyId: number;

  @Output() rowSelect = new EventEmitter<any>();
  @Output() userRowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() copy = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() custom = new EventEmitter<any>();
  @Output() deleteConfirm = new EventEmitter<any>();
  @Output() editConfirm = new EventEmitter<any>();
  @Output() copyConfirm = new EventEmitter<any>();
  @Output() createConfirm = new EventEmitter<any>();
  @Output() rowHover: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortColumn: EventEmitter<any> = new EventEmitter<any>();


  @ViewChild('pager', { static: false }) pager: PagerComponent;

  tableClass: string;
  tableId: string;
  perPageSelect: any;
  isHideHeader: boolean;
  isHideSubHeader: boolean;
  isPagerDisplay: boolean;
  rowClassFunction: Function;
  sortDirection = 'asc';
  sortColumnId = '';

  grid: Grid;
  defaultSettings: Object = {
    mode: 'inline', // inline|external|click-to-edit
    selectMode: 'single', // single|multi
    hideHeader: false,
    hideSubHeader: false,
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      custom: [],
      position: 'left', // left|right
    },
    filter: {
      inputClass: '',
    },
    edit: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    add: {
      inputClass: '',
      addButtonContent: 'Add New',
      createButtonContent: 'Create',
      cancelButtonContent: 'Cancel',
      confirmCreate: false,
    },
    delete: {
      deleteButtonContent: 'Delete',
      confirmDelete: false,
    },
    attr: {
      id: '',
      class: '',
    },
    noDataMessage: 'No data found',
    columns: {},
    pager: {
      display: true,
      perPage: 10,
    },
    rowClassFunction: () => ''
  };

  isAllSelected = false;

  ngOnInit() {
    this.sortColumnId = this.grid.getDataSet().getColumns()[0].id;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (this.grid) {
      if (changes['settings']) {
        this.grid.setSettings(this.prepareSettings());
      }
      if (changes['source']) {
        this.source = this.prepareSource();
        this.grid.setSource(this.source);
      }
      if (changes['rowCount']) {
        this.grid.setTotalRecords(this.rowCount);
      }
    } else {
      this.initGrid();
    }
    this.tableId = this.grid.getSetting('attr.id');
    this.tableClass = this.grid.getSetting('attr.class');
    this.isHideHeader = this.grid.getSetting('hideHeader');
    this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    this.isPagerDisplay = this.grid.getSetting('pager.display');
    this.isPagerDisplay = this.grid.getSetting('pager.display');
    this.perPageSelect = this.grid.getSetting('pager.perPageSelect');
    this.rowClassFunction = this.grid.getSetting('rowClassFunction');
  }

  getPage(): number {
    return this.pager.getPage();
  }

  setPage(page: number)  {
    // tslint:disable-next-line: no-unused-expression
    this.pager !== undefined ? this.pager.setPage(page) : null;
  }

  editRowSelect(row: Row) {
    if (this.grid.getSetting('selectMode') === 'multi') {
      this.onMultipleSelectRow(row);
    } else {
      this.onSelectRow(row);
    }
  }

  onUserSelectRow(row: Row) {
    if (this.grid.getSetting('selectMode') !== 'multi') {
      this.grid.selectRow(row);
      this.emitUserSelectRow(row);
      this.emitSelectRow(row);
    }
  }

  onRowHover(row: Row) {
    this.rowHover.emit(row);
  }

  multipleSelectRow(row: Row) {
    this.grid.multipleSelectRow(row);
    this.emitUserSelectRow(row);
    this.emitSelectRow(row);
  }

  onSelectAllRows($event: any) {
    this.isAllSelected = !this.isAllSelected;
    this.grid.selectAllRows(this.isAllSelected);

    this.emitUserSelectRow(null);
    this.emitSelectRow(null);
  }

  onSelectRow(row: Row) {
    this.grid.selectRow(row);
    this.emitSelectRow(row);
  }

  onMultipleSelectRow(row: Row) {
    this.emitSelectRow(row);
  }

  initGrid() {
    this.source = new LocalDataSource();
    this.grid = new Grid(this.source, this.prepareSettings(), this.rowCount, this.labelNoRecords);
    this.grid.onSelectRow().subscribe((row) => this.emitSelectRow(row));
  }

  prepareSource(): DataSource {
    if (this.source instanceof DataSource) {
      return this.source;
    } else if (this.source instanceof Array) {
      const localDataSource = new LocalDataSource(this.source);
      localDataSource.setSort([ {field: this.sortColumnId, direction: this.sortDirection}, ]);
      return localDataSource;
    }

    return new LocalDataSource();
  }

  prepareSettings(): Object {
    return deepExtend({}, this.defaultSettings, this.settings);
  }

  changePage($event: any) {
    this.resetAllSelector();
    this.pageChange.emit({ $event });
  }

  sort($event: any) {
    this.resetAllSelector();
    this.sortColumnId = $event.column;
    this.sortDirection = $event.currentDirection;
    this.sortColumn.emit({ column : this.sortColumnId, currentDirection: this.sortDirection });
  }

  filter($event: any) {
    this.resetAllSelector();
  }

  private resetAllSelector() {
    this.isAllSelected = false;
  }

  private emitUserSelectRow(row: Row) {
    const selectedRows = this.grid.getSelectedRows();

    this.userRowSelect.emit({
      data: row ? row.getData() : null,
      isSelected: row ? row.getIsSelected() : null,
      source: this.source,
      selected: selectedRows && selectedRows.length ? selectedRows.map((r: Row) => r.getData()) : [],
    });
  }

  private emitSelectRow(row: Row) {
    if (row) {
      this.rowSelect.emit({
        data: row ? row.getData() : null,
        isSelected: row ? row.getIsSelected() : null,
        source: this.source,
      });
    } else {
      this.rowSelect.emit({ allSelected: this.isAllSelected });
    }

  }

}
