import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';

import { AlertService } from 'src/app/_services';
import { SourceService } from '../source.service';

import { SourceMaster } from '../source.model';

@Component({
  selector: 'app-sourcelist',
  templateUrl: './sourcelist.component.html',
  styleUrls: ['./sourcelist.component.scss']
})
export class SourcelistComponent implements OnInit {

  @ViewChild("sourceNav") sidenav: MatSidenav;
  pageTitle: string = "Lead Source List"

  sourceList: Array<any>;
  sourceTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  sourceMaster: SourceMaster = null;

  constructor(private sourceService: SourceService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.sourceMaster = Object.assign({}, $event.rowData);
        this.sidenav.open();
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.reset();
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {

      }
    }

  }


  saveSource(sourceMaster: SourceMaster) {
    if (sourceMaster) {
      if (sourceMaster.LeadSourceId < 1) {
        this.sourceMaster.LeadSourceId = this.sourceList.length + 1;
      }
      this.sourceService.Save(sourceMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset() {


    this.sourceMaster = this.sourceService.NewSource();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.sourceService.GetAll().subscribe(result => {
      this.sourceList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];
  
      this.sourceTableSchema =
        [
          { ColumnField: "LeadSourceName", ColumnHeader: "Lead Source Name", Type: "text" },
          { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
        ];
  }
}
