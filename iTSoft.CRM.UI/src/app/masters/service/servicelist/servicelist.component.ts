import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { ServiceService } from '../service.service';

import { ServiceMaster } from '../service.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared';
import { NgForm } from '@angular/forms/';

@Component({
  selector: 'app-servicelist',
  templateUrl: './servicelist.component.html',
  styleUrls: ['./servicelist.component.scss']
})
export class ServicelistComponent implements OnInit {
  @ViewChild("serviceNav") serviceNav: MatSidenav;
  @ViewChild("serviceForm") serviceForm : NgForm;
  pageTitle:string = "Service List";

  serviceList: Array<any>;
  serviceTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  serviceMaster: ServiceMaster = null;

  constructor(
    public dialog: MatDialog,
    private serviceService: ServiceService,
     private alertService: AlertService
     ) { }

  ngOnInit(): void {
    this.reset(this.serviceForm);
    this.SetTableSchema();
    this.getAll();
  }


  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.serviceMaster = Object.assign({}, $event.rowData);
        this.serviceNav.open();
      }
      else if($event.command.commandType == CommandType.Delete)
      {
        this.Delete(Object.assign({}, $event.rowData));
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.reset(this.serviceForm);
        this.serviceNav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
      this.getAll();
      }
    }

  }

  Delete(data: ServiceMaster) {

    let dialogData =  {title : "Confirm Action", message : "Are you sure ? Do you really want to delete selected record ? "};

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if (result == "CONFIRMED") {
        this.serviceService.Delete(data).subscribe(result => {
          this.alertService.showSuccessMessage("Record Deleted successfully");
          this.reset(this.serviceForm);
          this.getAll();
        }, error => {
          this.alertService.showErrorMessage(error.error);
        });
      }
    });

  
  }


  saveService(serviceForm : NgForm) {
    if (serviceForm && serviceForm.valid) {
      this.serviceService.Save(this.serviceMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Service saved successfully");
        this.reset(serviceForm);
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  reset(serviceForm : NgForm) {
    this.serviceMaster = this.serviceService.NewService();

    if (serviceForm) {
      serviceForm.reset();
      serviceForm.resetForm();
    }

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
        { ColumnField: "Price", ColumnHeader: "Default Price", Type: "text" },
         { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
         { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }, { commandType: CommandType.Delete }] }
      ];



  }
}
