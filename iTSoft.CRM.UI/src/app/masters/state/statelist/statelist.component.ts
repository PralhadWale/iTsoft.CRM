import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { StateMaster } from '../state.model';
import { StateService } from '../state.service';

@Component({
  selector: 'app-statelist',
  templateUrl: './statelist.component.html',
  styleUrls: ['./statelist.component.scss']
})
export class StatelistComponent implements OnInit {

  @ViewChild("stateNav") sidenav: MatSidenav;
  pageTitle: "State List"

  stateList: Array<any>;
  stateTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  stateMaster: StateMaster = null;
  constructor(private stateService: StateService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }

  onAddStateClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveState(stateForm: NgForm) {
    if (stateForm && stateForm.valid) {

    }
  }

  reset() {


    this.stateMaster = this.stateService.NewState();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.stateTableSchema =
      [
        { ColumnField: "stateName", ColumnHeader: "State Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.stateList = [{ stateName: "Test Name" }]
  }


}
