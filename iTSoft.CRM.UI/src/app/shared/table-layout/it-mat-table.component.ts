import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from 'querystring';
import {SelectionModel} from '@angular/cdk/collections';
@Component({
  selector: 'it-mat-table',
  templateUrl: './it-mat-table.component.html',
  styleUrls: ['./it-mat-table.component.scss']
})

export class ITMatTableComponent implements OnInit , OnChanges {

  @Input() tableSettings: TableDefaultSettings;
  @Input() dataSource: Array<any> = [];
  @Input() tableSchema: Array<TableColumnModel> = [];
  @Output() sqCellClick = new EventEmitter();
  @Output() onAddClick = new EventEmitter();
  @Output() onSearchClick = new EventEmitter();
  @Output() onRefreshClick = new EventEmitter();
  @Output() onCommandClick = new EventEmitter<CommandEventArgs>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
 
  commandDefaultStyles: Array<CommandModel> = [{},{ click: null, commandType: CommandType.Edit, icon: 'edit', content: 'edit', style: { 'background-color': 'teal',  'margin': '5px' } },
  { click: null, commandType: CommandType.Delete, icon: 'delete', content: 'delete', style: { 'background-color': 'lightblue',  'margin': '5px' } },
  { click: null, commandType: CommandType.Delete, icon: 'visibility', content: 'view', style: { 'background-color': 'pink',  'margin': '5px' } }];


  toolBarItems: Array<CommandModel> = [{}, { icon: 'queue', style: { 'margin-right': '10px', 'background-color': '#e07c9e' } },
  { icon: 'search', style: { 'margin-right': '10px', 'background-color': '#a28b6e' } },
  { icon: 'refresh', style: { 'margin-right': '10px', 'background-color': '#darkgray' } },
  { icon: 'transfer_within_a_station', style: { 'margin-right': '10px', 'background-color': 'green' } },
];

  filterText :string = "";

  constructor() {
    
    if (!this.tableSettings) {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = false;
      this.tableSettings.ShowTransferToolBarItem = false;
      this.tableSettings.AllowEdit = false;
      
    }

    if(this.tableSettings.ShowToolBar && (this.tableSettings.ToolBarItems == null || this.tableSettings.ToolBarItems.length == 0))
    {
      this.tableSettings.ToolBarItems = [ ToolBarItems.Add, ToolBarItems.Refresh,ToolBarItems.Search];

    }

    // if(this.tableSettings.ShowToolBar && this.tableSettings.ShowTransferToolBarItem)
    // {
    //   this.tableSettings.ToolBarItems .push(ToolBarItems.Transfer)
    // }

  }

  ngOnInit(): void {
    this.SetTable();
  }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tableSchema) {
      this.tableSchema = changes.tableSchema.currentValue;
    }
    if (changes.tableSettings) {
    this.tableSettings = changes.tableSettings.currentValue;
    }

    if (changes.dataSource) {
    this.dataSource = changes.dataSource.currentValue;
    this.selection.clear();
   
    }
  
    this.SetTable();
  }

  private SetTable() {
    this.displayedColumns = [];
    this.tableSchema.forEach(element => {

      if(element.Command != null)
      {
        element.Command.forEach(command => {
          if (!command.customstyle) {
            command.style = this.commandDefaultStyles[command.commandType].style;
            command.icon = this.commandDefaultStyles[command.commandType].icon;
            command.content = this.commandDefaultStyles[command.commandType].icon;
          }
        });
      }

      this.displayedColumns.push(element.ColumnField);
    });

    this.RefreshDataSource();
  }
  

  // Refresh Table datasource. it will fire change detection and will reflect datasource changes on table.
  RefreshDataSource() {
    this.tableDataSource.filter = null;
    this.filterText = "";
    this.tableDataSource.data = this.dataSource;
    if (this.dataSource != null) {
      this.tableDataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.tableDataSource.filter = filterValue;
  }

  addClick($event) {
    this.onAddClick.emit($event);
  }

  searchClick($event) {
    this.onSearchClick.emit($event);
  }

  refreshClick($event) {
    this.onRefreshClick.emit($event);
  }

  commandClick($event:any , element:any , col:TableColumnModel , command : CommandModel)
  {
     let commandEventArgs : CommandEventArgs = { $event : $event , rowData : element, column : col , command:command , selectedItems:this.selection.selected };
     this.onCommandClick.emit(commandEventArgs);
  }

  toolBarCommandClick($event:any , command : CommandModel , toolbarItem : ToolBarItems)
  {
    let commandEventArgs : CommandEventArgs = { $event : $event , command:command , toolbarItem : toolbarItem , selectedItems:this.selection.selected};
    this.onCommandClick.emit(commandEventArgs);
  }

  onMatCellClick(cellValue) {
    let value = cellValue;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.tableDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.tableDataSource.data.forEach(row => this.selection.select(row));
  }
}

export class TableColumnModel {
  ColumnField: string;
  ColumnHeader: string;
  Type: string;
  AllowEdit?: boolean;
  DefaultValue?: string;
  itemSource?: Array<SelectListItem>;
  Command? : Array<CommandModel>;
}

export class TableDefaultSettings {

  ShowToolBar: boolean = false;
  AllowEdit: boolean = false;
  ToolBarItems: Array<ToolBarItems> = [];
  ShowTransferToolBarItem: boolean;
  HideFilter: boolean;
  AllowPaging:boolean = true;
  
}

export class CommandModel
{
  customstyle? : boolean = true;
  commandType? : CommandType;
  content?: string;
  style? : object;
  click?: Function;
  icon?:string;

}

export class CommandEventArgs
{
  $event?:any ;
  rowData?:any ;
  column?:TableColumnModel;
  command?:CommandModel;
  toolbarItem? : ToolBarItems;
  selectedItems : Array<any>;
}

export class SelectListItem {
  Text: string;
  Value: string;
}

export enum ToolBarItems
{
  Add=1,
  Search=2,
  Refresh=3,
  Transfer
}


export enum CommandType
{
  Edit=1,
  Delete=2,
  View=3,
  Other=4,
}
