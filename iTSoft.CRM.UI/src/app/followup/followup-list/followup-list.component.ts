import { Component, OnInit } from '@angular/core';
import { TableColumnModel, TableDefaultSettings } from 'src/app/shared/table-layout/it-mat-table.component';

@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  styleUrls: ['./followup-list.component.scss']
})
export class FollowupListComponent implements OnInit {
  pageTitle: "Followup List"

  followUpList: Array<any>;
  followUpTableSchema: Array<TableColumnModel> = [];
  tableSettings : TableDefaultSettings;
  constructor() { }

  ngOnInit(): void {
       this.SetTableSchema();
  }

  onAddFollowUpClick($event:any)
  {
    let e = 100;
    
  }

  

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;

    this.followUpTableSchema =
      [
        { ColumnField: "RequestType", ColumnHeader: "Request Type", Type: "text" },
        { ColumnField: "RequestNo", ColumnHeader: "Request No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Request Date", Type: "date" },
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


    this.followUpList = [{ Date: Date(),RequestType:"asdadasd",RequestDate:Date(),RequestNo:"234234234", FollowUpDate: Date(), DealStatus: "Completed", EmployeeName: "Pralhad", Attempt: 1, Comment: "asd", Remark: "asd", ClientRating: 10 , State:"asdas",Status:"sdas" }]
  }


}