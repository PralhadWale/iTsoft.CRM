import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { DepartmentService } from '../department.service';

import { DepartmentMaster } from '../department.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared';
import { NgForm } from '@angular/forms/';
@Component({
  selector: 'app-departmentlist',
  templateUrl: './departmentlist.component.html',
  styleUrls: ['./departmentlist.component.scss']
})
export class DepartmentlistComponent implements OnInit {
  @ViewChild("departmentForm") departmentForm: NgForm;
  @ViewChild("departmentNav") sidenav: MatSidenav;
  pageTitle: string = "Department List"

  departmentList: Array<any>;
  departmentTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  departmentMaster: DepartmentMaster = null;

  constructor(
    private departmentService: DepartmentService,
    private alertService: AlertService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.getAll();
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.departmentMaster = Object.assign({}, $event.rowData);
        this.sidenav.open();
      }
      else if ($event.command.commandType == CommandType.Delete) {
        this.Delete(Object.assign({}, $event.rowData));
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.reset();
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.getAll();
      }
    }

  }


  saveDepartment(form: NgForm) {
    if (form && form.valid) {
      this.departmentService.Save(this.departmentMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  Delete(data: DepartmentMaster) {

    let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to delete selected record ? " };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if (result == "CONFIRMED") {
        this.departmentService.Delete(data).subscribe(result => {
          this.alertService.showSuccessMessage("Record Deleted successfully");
          this.reset();
          this.getAll();
        }, error => {
          this.alertService.showErrorMessage(error.error);
        });
      }
    });
  }

  reset() {

    this.departmentMaster = this.departmentService.NewDepartment();
    
    if (this.departmentForm) {
      this.departmentForm.reset();
      this.departmentForm.resetForm();
    }

    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.departmentService.GetAll().subscribe(result => {
      this.departmentList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];

    this.departmentTableSchema =
      [
        { ColumnField: "DepartmentName", ColumnHeader: "Department Name", Type: "text" },
        { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }, { commandType: CommandType.Delete }] }
      ];
  }
}
