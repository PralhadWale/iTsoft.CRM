import { Component, OnInit } from '@angular/core';
import { TableColumnModel } from 'src/app/shared/table-layout/it-mat-table.component';

@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  styleUrls: ['./followup-list.component.scss']
})
export class FollowupListComponent implements OnInit {
  pageTitle: "Followup List"

  followUpList: Array<any>;
  followUpTableSchema: Array<TableColumnModel> = [];
  constructor() { }

  ngOnInit(): void {
       this.SetTableSchema();
  }

  SetTableSchema() {
    this.followUpTableSchema =
      [
        { ColumnField: "RequestType", ColumnHeader: "Request Type", Type: "text" },
        { ColumnField: "RequestNo", ColumnHeader: "Request No", Type: "text" },
        { ColumnField: "Request Date", ColumnHeader: "Request Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "State", ColumnHeader: "State", Type: "text" },
        { ColumnField: "Status", ColumnHeader: "Deal Status", Type: "text" },
        { ColumnField: "Comment", ColumnHeader: "Comment", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "EmployeeName", ColumnHeader: "Employee Name", Type: "text" },
        { ColumnField: "Attempt", ColumnHeader: "Attempt", Type: "text" },
        { ColumnField: "ClientRating", ColumnHeader: "Client Rating", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];


    this.followUpList = [{ Date: Date(), FollowUpDate: Date(), DealStatus: "Completed", EmployeeName: "Pralhad", Attempt: 1, Comment: "", Remark: "", ClientRating: 10 }]
  }


}
