import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { StatusMaster } from '../status.model';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-statuslist',
  templateUrl: './statuslist.component.html',
  styleUrls: ['./statuslist.component.scss']
})
export class StatuslistComponent implements OnInit {

 
  @ViewChild("statusNav") sidenav: MatSidenav;
  pageTitle: "Status List"

  statusList: Array<any>;
  statusTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  statusMaster: StatusMaster = null;
  constructor(private statusService: StatusService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }

  onAddStatusClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveStatus(statusMaster: StatusMaster) {
    if (statusMaster) {

    }
  }

  reset() {


    this.statusMaster = this.statusService.NewStatus();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.statusTableSchema =
      [
        { ColumnField: "statusName", ColumnHeader: "Status Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.statusList = [{ statusName: "Test Name" }]
  }
}
