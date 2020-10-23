import { Component, OnInit, ViewChild } from '@angular/core';
import { AddFollowupComponent } from 'src/app/process/add-followup/add-followup.component';
import { FollowupService } from 'src/app/process/services/followup.service';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { FollowUpSerchParameters } from 'src/app/_models/followupserchparameters';

@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  styleUrls: ['./followup-list.component.scss']
})
export class FollowupListComponent implements OnInit {
  pageTitle: "Followup List"
  @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
  followUpList: Array<any>;
  followUpTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  constructor(private followUpService : FollowupService) { }

  ngOnInit(): void {
    this.SetTableSchema();
    this.getFollowUp();
  }

  getFollowUp() {

    let filter = new FollowUpSerchParameters();
   // filter.RequestTypeId = <number>RequestType.Enquiry;
    filter.FromDate = new Date(2020, 10, 1);
    filter.ToDate = new Date(2021, 10, 1);
    this.followUpService.Search(filter).subscribe(result => {
      this.followUpList = result.Value.ResponseData;

    }, error => { console.log(error); });

  }
  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {

      }
      else if ($event.command.commandType == CommandType.View) {

      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.addFollowUp.sidenav.toggle(); 
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
      
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {

      }
    }

  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems =[ToolBarItems.Add,ToolBarItems.Search , ToolBarItems.Refresh]

    this.followUpTableSchema =
      [
        { ColumnField: "RequestType", ColumnHeader: "Request Type", Type: "text" },
        { ColumnField: "RequestNo", ColumnHeader: "Request No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Request Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "State", ColumnHeader: "State", Type: "text" },
        { ColumnField: "Status", ColumnHeader: "Deal Status", Type: "text" },
        { ColumnField: "Comment", ColumnHeader: "Comment", Type: "text" },
        { ColumnField: "EmployeeName", ColumnHeader: "Employee Name", Type: "text" },
        { ColumnField: "Attempt", ColumnHeader: "Attempt", Type: "text" },
        { ColumnField: "ClientRating", ColumnHeader: "Client Rating", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.followUpList = [{ Date: Date(), RequestType: "Enquiry", RequestDate: Date(), RequestNo: "ENQ/2020/10/0100", FollowUpDate: Date(), DealStatus: "Completed", EmployeeName: "Admin Admin", Attempt: 1, Remark: "ITR Help", ClientRating: 10, State: "Won", Status: "Completed" }]
  }


}
