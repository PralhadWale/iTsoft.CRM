import { Component, OnInit, ViewChild } from "@angular/core";


import * as _ from "lodash";

import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
import { RequestDetails } from '../_models/requestdetails';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';

import { RequestService } from '../process/services/request.service';
import { ListService } from '../process/services/list.service';
import { AlertService } from '../_services';
@Component({
  selector: 'enquiry-list',
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.css"],
})
export class EnquiryListComponent implements OnInit {
@ViewChild("sidenav")  sidenav : MatSidenav;

  pageTitle: string = "Enquiry List";
  
  searchFilter: RequestSerchParameters = new RequestSerchParameters(RequestType.Quotation);

  enquiryList: Array<any>;
  enquiryTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  requestSelectList: RequestSelectListModel = new RequestSelectListModel();
  constructor(
    private requestService: RequestService,
    private listService: ListService,
    private alertService: AlertService,
    private router : Router,

  ) {

  }
  ngOnInit(): void {
    this.SetTableSchema();
    this.getEnquiries();
    this.LoadSelectListData();
  }


  onCommandClick($event: CommandEventArgs) {
   
    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/enquiries/edit/', rowData.RequestId]);
      }
    
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/enquiries/edit/', 0]);
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.getEnquiries();
      }
    }

  }

  resetSearchFilter(sidenav:any)
  {
    this.sidenav.toggle();
  }

  searchEnquiries(searchFilter:any)
  {
    this.getEnquiries();
  }

  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = <RequestSelectListModel>result.Value.ResponseData;

        },

      );
  }

  getEnquiries() {

    this.requestService.Search(this.searchFilter).subscribe(result => {
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
