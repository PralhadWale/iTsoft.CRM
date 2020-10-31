import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { ServiceMaster } from '../service.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {
  @ViewChild("serviceNav") serviceNav: MatSidenav;
  pageTitle: "Service List"

  serviceList: Array<any>;
  serviceTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  serviceMaster: ServiceMaster = null;

  constructor(private serviceService: ServiceService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }


  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.serviceMaster = Object.assign({}, $event.rowData);
        this.serviceNav.open();
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.reset();
        this.serviceNav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {

      }
    }

  }


  saveService(serviceMaster: ServiceMaster) {
    if (serviceMaster) {
      if (serviceMaster.ServiceId < 1) {
        this.serviceMaster.ServiceId = this.serviceList.length + 1;
      }
      this.serviceService.Save(serviceMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Service saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset() {
    this.serviceMaster = this.serviceService.NewService();
    if (this.serviceNav != null) {
      this.serviceNav.close();
    }
  }

  getAll() {
    this.serviceService.GetAll().subscribe(result => {
      this.serviceList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];

    this.serviceTableSchema =
      [
        { ColumnField: "ServiceName", ColumnHeader: "Service Name", Type: "text" },
        { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
      ];



  }
}
