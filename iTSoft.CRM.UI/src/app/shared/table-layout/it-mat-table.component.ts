import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { stringify } from 'querystring';

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
  
  displayedColumns: string[] = [];
  tableDataSource = new MatTableDataSource<any>();
 
  commandDefaultStyles: Array<CommandModel> = [{},{ click: null, commandType: CommandType.Edit, icon: 'edit', content: 'edit', style: { 'background-color': 'teal', 'min-height': '30px', 'margin': '5px' } },
  { click: null, commandType: CommandType.Delete, icon: 'delete', content: 'delete', style: { 'background-color': 'lightblue', 'min-height': '30px', 'margin': '5px' } },
  { click: null, commandType: CommandType.Delete, icon: 'visibility', content: 'view', style: { 'background-color': 'pink', 'min-height': '30px', 'margin': '5px' } }];


  toolBarItems: Array<CommandModel> = [{}, { icon: 'queue', style: { 'margin-right': '10px', 'background-color': '#e07c9e' } },
  { icon: 'search', style: { 'margin-right': '10px', 'background-color': '#a28b6e' } },
  { icon: 'refresh', style: { 'margin-right': '10px', 'background-color': '#darkgray' } }];


  constructor() {
    if (!this.tableSettings) {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = false;
      this.tableSettings.AllowEdit = false;
      
    }

    if(this.tableSettings.ShowToolBar && (this.tableSettings.ToolBarItems == null || this.tableSettings.ToolBarItems.length == 0))
    {
      this.tableSettings.ToolBarItems = [ ToolBarItems.Add, ToolBarItems.Refresh,ToolBarItems.Search];
    }
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
    this.tableDataSource.data = this.dataSource;
  }

  applyFilter(filterValue) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
     let commandEventArgs : CommandEventArgs = { $event : $event , rowData : element, column : col , command:command };
     this.onCommandClick.emit(commandEventArgs);
  }

  toolBarCommandClick($event:any , command : CommandModel , toolbarItem : ToolBarItems)
  {
    let commandEventArgs : CommandEventArgs = { $event : $event , command:command , toolbarItem : toolbarItem };
    this.onCommandClick.emit(commandEventArgs);
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
  Command? : Array<CommandModel>;
}

export class TableDefaultSettings {

  ShowToolBar: boolean = false;
  AllowEdit: boolean = false;
  ToolBarItems: Array<ToolBarItems> = [];
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
}


export enum CommandType
{
  Edit=1,
  Delete=2,
  View=3,
  Other=4,
}
