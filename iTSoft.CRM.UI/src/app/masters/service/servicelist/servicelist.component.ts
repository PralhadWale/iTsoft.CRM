import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';
import { ServiceMaster } from '../service.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {
  @ViewChild("serviceNav") sidenav: MatSidenav;
  pageTitle: "Service List"

  serviceList: Array<any>;
  serviceTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  serviceMaster: ServiceMaster = null;

  constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
  }

  onAddServiceClick($event: any) {

    this.reset();
    this.sidenav.toggle();

  }

  saveService(serviceMaster: ServiceMaster) {
    if (serviceMaster) {

    }
  }

  reset() {
    this.serviceMaster = this.serviceService.NewService();
    if (this.sidenav != null) {
      this.sidenav.close();
    }
  }


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.serviceTableSchema =
      [
        { ColumnField: "serviceName", ColumnHeader: "Service Name", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.serviceList = [{ serviceName: "Test Name" }]
  }
}
