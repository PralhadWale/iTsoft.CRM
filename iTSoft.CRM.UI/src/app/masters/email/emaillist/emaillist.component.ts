import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { EmailService } from '../email.service';

import { EmailMaster } from '../email.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared';
import { NgForm } from '@angular/forms/';
@Component({
  selector: 'app-emaillist',
  templateUrl: './emaillist.component.html',
  styleUrls: ['./emaillist.component.scss']
})
export class EmaillistComponent implements OnInit {
  @ViewChild("emailForm") emailForm: NgForm;
  @ViewChild("emailNav") sidenav: MatSidenav;
  pageTitle: string = "Email List"

  emailList: Array<any>;
  emailTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  emailMaster: EmailMaster = null;

  constructor(
    private emailService: EmailService,
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
        this.emailMaster = Object.assign({}, $event.rowData);
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


  saveEmail(form: NgForm) {
    if (form && form.valid) {
      this.emailService.Save(this.emailMaster).subscribe(result => {
        this.alertService.showSuccessMessage("Record saved successfully");
        this.reset();
        this.getAll();
      }, error => {
        this.alertService.showErrorMessage(error.error);
      })
    }
  }

  Delete(data: EmailMaster) {

    let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to delete selected record ? " };

    const dialogRef = this.dialog.open(ConfirmDialog, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if (result == "CONFIRMED") {
        this.emailService.Delete(data).subscribe(result => {
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

    this.emailMaster = this.emailService.NewEmail();
    
    if (this.emailForm) {
      this.emailForm.reset();
      this.emailForm.resetForm();
    }

    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  getAll() {
    this.emailService.GetAll().subscribe(result => {
      this.emailList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh];

    this.emailTableSchema =
      [
        { ColumnField: "Email", ColumnHeader: "Email", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }, { commandType: CommandType.Delete }] }
      ];
  }
}
