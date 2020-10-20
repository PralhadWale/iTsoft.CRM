import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { StageMaster } from '../stage.model';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-stagelist',
  templateUrl: './stagelist.component.html',
  styleUrls: ['./stagelist.component.scss']
})
export class StagelistComponent implements OnInit {

  @ViewChild("stageNav") sidenav: MatSidenav;
  pageTitle: "Stage List"

  stageList: Array<any>;
  stageTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  stageMaster: StageMaster = null;
  constructor(private stageService: StageService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }

  onAddStageClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveStage(stageMaster: StageMaster) {
    if (stageMaster) {

    }
  }

  reset() {


    this.stageMaster = this.stageService.NewStage();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.stageTableSchema =
      [
        { ColumnField: "stageName", ColumnHeader: "Stage Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.stageList = [{ stageName: "Test Name" }]
  }
}
