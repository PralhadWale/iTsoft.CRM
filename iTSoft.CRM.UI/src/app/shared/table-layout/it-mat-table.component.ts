import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'it-mat-table',
  templateUrl: './it-mat-table.component.html',
  styleUrls: ['./it-mat-table.component.scss']
})

export class ITMatTableComponent implements OnInit {
  // @Input() displayedColumns;
  // @Input() dataSource;
  // @Input() message;
  @Input() dataSource: Array<any> = [];
  @Input() tableSchema: Array<TableColumnModel> = [];
  @Output() sqCellClick = new EventEmitter();

  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();

  isNewRow: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.tableSchema.forEach(element => {
      this.displayedColumns.push(element.ColumnField);
    });

    this.RefreshDataSource();
  }

  editRow(e: any) {
    this.DiscardAdd();
    this.SetObjectEdit(e, true);
  }

  cancelEdit(e: any) {
    this.DiscardAdd();
    this.SetObjectEdit(e, false);
  }

  DeleteRow(e: any) {
    let confirmToDelete: boolean = false;
    if (confirm("Are you sure want to reset? Click 'OK'")) {
      confirmToDelete = true;
      if (confirmToDelete) {
        // this.dataSource = this.dataSource.filter(obj => obj !== e);
        this.dataSource = this.dataSource.filter((value, key) => {
          // return value.id != row_obj.id;
          if (value.no == e.no) {
            value.spentAmount = 0;
            value.employerDefinedAmount = 0;
            value.qualifiedAmount = 0;
          }
          return true;
        });
        this.RefreshDataSource();
      }
    }
  }

  onFileInput($event) {

  }

  saveRow(e: any) {
    this.SetObjectEdit(e, false);
    this.RefreshDataSource();
  }

  addRow() {
    if (!this.isNewRow) {
      let data = Object.assign({}, this.dataSource[this.dataSource.length - 1]);
      for (var prop in data) {
        if (data.hasOwnProperty(prop)) {
          data[prop] = '';
        }
      }
      data.isEdit = true;
      this.dataSource.push(data);
      this.RefreshDataSource();
      this.isNewRow = true;
    }
  }

  private SetObjectEdit(e: any, isEdit: boolean = true) {
    if (!e.isEdit)
      e.isEdit = isEdit;
    else
      e.isEdit = isEdit;
    this.isNewRow = isEdit;
  }

  private DiscardAdd() {
    if (this.isNewRow === true) {
      if (!(this.dataSource == null || this.dataSource == undefined) && this.dataSource.length > 0) {
        this.dataSource.pop();
      }
    }
    this.RefreshDataSource();
  }

  // Refresh Table datasource. it will fire change detection and will reflect datasource changes on table.
  RefreshDataSource() {
    this.tableDataSource.data = this.dataSource;
    this.isNewRow = false;
  }

  applyFilter($event: any) {

  }


  onMatCellClick(cellValue) {
    let value = cellValue;
  }
}

export class TableColumnModel {
  ColumnField: string;
  ColumnHeader: string;
  Type: string;
  AllowEdit?: boolean;
  DefaultValue?: string;
  itemSource?: Array<SelectListItem>;
}

export class SelectListItem {
  Text: string;
  Value: string;
}


