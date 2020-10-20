import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { SourceMaster } from '../source.model';
import { SourceService } from '../source.service';

@Component({
  selector: 'app-sourcelist',
  templateUrl: './sourcelist.component.html',
  styleUrls: ['./sourcelist.component.scss']
})
export class SourcelistComponent implements OnInit {
  @ViewChild("sourceNav") sidenav: MatSidenav;
  pageTitle: "Source List"

  sourceList: Array<any>;
  sourceTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  sourceMaster: SourceMaster = null;
  constructor(private sourceService: SourceService) {

  }
  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }
  onAddSourceClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveSource(sourceMaster: SourceMaster) {
    if (sourceMaster) {

    }
  }

  reset() {


    this.sourceMaster = this.sourceService.NewSource();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.sourceTableSchema =
      [
        { ColumnField: "sourceName", ColumnHeader: "Source Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.sourceList = [{ sourceName: "Test Name" }]
  }

}
