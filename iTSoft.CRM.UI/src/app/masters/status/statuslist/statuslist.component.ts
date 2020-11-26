import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';

import { AlertService } from 'src/app/_services';
import { StatusService } from '../status.service';

import { StatusMaster } from '../status.model';

@Component({
  selector: 'app-statuslist',
  templateUrl: './statuslist.component.html',
  styleUrls: ['./statuslist.component.scss']
})
export class StatuslistComponent implements OnInit {

  @ViewChild("statusNav") sidenav: MatSidenav;
  pageTitle: string = "Lead Status List"

  statusList: Array<any>;
  statusTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  statusMaster: StatusMaster = null;

  constructor(private statusService: StatusService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.statusMaster = Object.assign({}, $event.rowData);
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


  saveStatus(statusMaster: StatusMaster) {
    if (statusMaster) {
     
      this.statusService.Save(statusMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset() {


    this.statusMaster = this.statusService.NewStatus();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.statusService.GetAll().subscribe(result => {
      this.statusList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];
  
      this.statusTableSchema =
        [
          { ColumnField: "LeadStatusName", ColumnHeader: "Status Name", Type: "text" },
          { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
        ];
  }
}
