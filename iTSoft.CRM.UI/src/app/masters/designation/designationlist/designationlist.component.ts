import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { DesignationService } from '../designation.service';

import { DesignationMaster } from '../designation.model';
import { ConfirmDialog } from 'src/app/shared';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms/';
@Component({
  selector: 'app-designationlist',
  templateUrl: './designationlist.component.html',
  styleUrls: ['./designationlist.component.scss']
})
export class DesignationlistComponent implements OnInit {

  @ViewChild("designationNav") sidenav: MatSidenav;
  @ViewChild("designationForm") designationForm: NgForm;
  pageTitle: string = "Designation List"

  designationList: Array<any>;
  designationTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  designationMaster: DesignationMaster = null;

  constructor(
    private designationService: DesignationService, 
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
        this.designationMaster = Object.assign({}, $event.rowData);
        this.sidenav.open();
      }
      else if($event.command.commandType == CommandType.Delete)
      {
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


  saveDesignation(form : NgForm) {
    if (form && form.valid) {
    
      this.designationService.Save(this.designationMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  Delete(data: DesignationMaster) {

    let dialogData =  {title : "Confirm Action", message : "Are you sure ? Do you really want to delete selected record ? "};

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if (result == "CONFIRMED") {
        this.designationService.Delete(data).subscribe(result => {
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

    this.designationMaster = this.designationService.NewDesignation();
    if(this.designationForm)
    {
      this.designationForm.reset();
      this.designationForm.resetForm();
    }

    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.designationService.GetAll().subscribe(result => {
      this.designationList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];
  
      this.designationTableSchema =
        [
          { ColumnField: "DesignationName", ColumnHeader: "Designation Name", Type: "text" },
          { ColumnField: "IsActive", ColumnHeader: "Active", Type: "boolean" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit },{ commandType: CommandType.Delete }] }
        ];
  }
}
