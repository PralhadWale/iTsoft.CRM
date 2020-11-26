import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';

import { AlertService } from 'src/app/_services';
import { StageService } from '../stage.service';

import { StageMaster } from '../stage.model';

@Component({
  selector: 'app-stagelist',
  templateUrl: './stagelist.component.html',
  styleUrls: ['./stagelist.component.scss']
})
export class StagelistComponent implements OnInit {

  @ViewChild("stageNav") sidenav: MatSidenav;
  pageTitle: string = "Lead Stage List"

  stageList: Array<any>;
  stageTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  stageMaster: StageMaster = null;

  constructor(private stageService: StageService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.stageMaster = Object.assign({}, $event.rowData);
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


  saveStage(stageMaster: StageMaster) {
    if (stageMaster) {
    
      this.stageService.Save(stageMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset() {


    this.stageMaster = this.stageService.NewStage();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.stageService.GetAll().subscribe(result => {
      this.stageList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];
  
      this.stageTableSchema =
        [
          { ColumnField: "StageName", ColumnHeader: "Stage Name", Type: "text" },
          { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
        ];
  }
}
