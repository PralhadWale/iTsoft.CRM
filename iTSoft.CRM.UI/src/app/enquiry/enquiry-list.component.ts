import { Component, OnInit, ViewChild } from "@angular/core";


import * as _ from "lodash";
import { RequestService } from '../process/services/request.service';
import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { RequestDetails } from '../_models/requestdetails';
@Component({
  selector: 'enquiry-list',
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.css"],
})
export class EnquiryListComponent implements OnInit {
@ViewChild("sidenav")  sidenav : MatSidenav;

  pageTitle: string = "Enquiry List";
  searchFilter: any = {
    Name: "",
    Email: "",
    Phone: "",
    EnquiryNo: ""

  };
  
  enquiryList: Array<any>;
  enquiryTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  
  constructor(
    private requestService: RequestService,
    private router : Router,

  ) {

  }
  ngOnInit(): void {
    this.SetTableSchema();
    this.getEnquiries();
  }


  onCommandClick($event: CommandEventArgs) {
   
    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/enquiries/edit/', rowData.RequestId]);
      }
      else if ($event.command.commandType == CommandType.Delete) {

      }
      else if ($event.command.commandType == CommandType.View) {

      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/enquiries/edit/', 0]);
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
        this.sidenav.toggle();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        
      }
    }

  }

  resetSearchFilter(sidenav:any)
  {
    this.sidenav.toggle();
  }

  searchEnquiries(searchFilter:any)
  {
    this.sidenav.toggle();
  }

  getEnquiries() {

    let filter = new RequestSerchParameters();
    filter.RequestTypeId = <number>RequestType.Enquiry;
    filter.FromDate = new Date(2020, 10, 1);
    filter.ToDate = new Date(2021, 10, 1);
    this.requestService.Search(filter).subscribe(result => {
      this.enquiryList = result.Value.ResponseData;

    }, error => { console.log(error); });

  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh , ToolBarItems.Search];
    
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit}
    ];

    this.enquiryTableSchema =
      [
        { ColumnField: "RequestNo", ColumnHeader: "Enquiry No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Enquiry Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "Title", ColumnHeader: "Title", Type: "text" },
        { ColumnField: "CustomerName", ColumnHeader: "CustomerName", Type: "text" },
        { ColumnField: "PhoneNo2", ColumnHeader: "Phone No 2", Type: "text" },
        { ColumnField: "LeadSourceName", ColumnHeader: "Source", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Status", Type: "text" },
        { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command : gridCommands }
      ];


  
  }


}
