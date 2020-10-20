import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { DesignationMaster } from '../designation.model';
import { DesignationService } from '../designation.service';

@Component({
  selector: 'app-designationlist',
  templateUrl: './designationlist.component.html',
  styleUrls: ['./designationlist.component.scss']
})
export class DesignationlistComponent implements OnInit {

  @ViewChild("designationNav") sidenav: MatSidenav;
  pageTitle: "Designation List"

  designationList: Array<any>;
  designationTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  designationMaster: DesignationMaster = null;
  constructor(private designationService: DesignationService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }

  onAddDesignationClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveDesignation(designationMaster: DesignationMaster) {
    if (designationMaster) {

    }
  }

  reset() {


    this.designationMaster = this.designationService.NewDesignation();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.designationTableSchema =
      [
        { ColumnField: "designationName", ColumnHeader: "Designation Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.designationList = [{ designationName: "Test Name" }]
  }
}
