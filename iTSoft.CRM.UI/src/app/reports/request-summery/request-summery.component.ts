import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { NgForm } from "@angular/forms/";
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';

import { RequestType } from "src/app/_models/requesttype";
import { RequestDetails } from "src/app/_models/requestdetails";
import { RequestSerchParameters } from "src/app/_models/Requestserchparameters";
import { RequestSelectListModel } from "src/app/_models/requestselectlistmodel";

import { AlertService } from "src/app/_services";
import { UserProfilService } from "src/app/_services/userProfile.Service";
import { ListService } from "src/app/process/services/list.service";
import { RequestService } from "src/app/process/services/request.service";
@Component({
  selector: 'request-summery-report',
  templateUrl: "./request-summery.component.html",
  styleUrls: ["./request-summery.component.scss"],
})
export class RequestSummeryReportComponent implements OnInit {
@ViewChild("sidenav")  sidenav : MatSidenav;
@ViewChild("enquiryForm") enquiryForm : NgForm;

  pageTitle: string = " Report";
  
  searchFilter: RequestSerchParameters = new RequestSerchParameters(RequestType.Enquiry);

  enquiryList: Array<any>;
  selectedEnquiryList:Array<RequestDetails>;
  enquiryTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  requestSelectList: RequestSelectListModel = new RequestSelectListModel();
  requestDetails : RequestDetails  = new RequestDetails();

  requestTypeId : number = 0;
  requestTypeName : string = "";

  fieldColspan = 6;
  constructor(
    private userProfileService:UserProfilService,
    private requestService: RequestService,
    public listService: ListService,
    private alertService: AlertService,
    private router : Router,

  ) {
  
    

  }
 

  ngOnInit(): void {

    this.requestTypeId = this.router.url.includes("quotation") ?  RequestType.Quotation : RequestType.Enquiry;
    this.requestTypeName = this.router.url.includes("quotation") ?  "Quotation" : "Enquiry";
    this.pageTitle =  this.requestTypeName + " "+ this.pageTitle;

    this.SetTableSchema();
    this.SetFilter();
    this.LoadSelectListData();
  }



  private SetFilter(resetToDefault: boolean = false) {
    this.searchFilter = new RequestSerchParameters(this.requestTypeId);
  }

  resetSearchFilter(sidenav:any)
  {
    this.SetFilter();
    this.sidenav.toggle();
  }

  onAssigned()
  {
    this.getEnquiries();
  }
  
  onCommandClick($event: CommandEventArgs) {
    if ($event.toolbarItem) {
      if ($event.toolbarItem == ToolBarItems.Search) {
        this.sidenav.open();
      }
    }
  }

  searchEnquiries(searchFilter:any)
  {
    if (this.enquiryForm.valid) {
      this.getEnquiries();
    }
  }

  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = result;
        },
      );
  }

  

  getEnquiries() {
 
    this.searchFilter.UserId = this.userProfileService.CurrentUser.UserId;
    if(this.userProfileService.IsAdvisor)
    {
      this.searchFilter.AdvisorId = this.userProfileService.CurrentUser.UserId;
    }

    this.requestService.Search(this.searchFilter).subscribe(result => {
      this.enquiryList = result.Value.ResponseData;
      if(this.sidenav)
      {
        this.sidenav.close()
      }
    }, error => { console.log(error); });

  }



  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ ToolBarItems.Search];

    this.enquiryTableSchema =
      [
        { ColumnField: "RequestNo", ColumnHeader: this.requestTypeName + " No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader:  this.requestTypeName +" Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "ClientTypeName", ColumnHeader:  this.requestTypeName + " Type", Type: "text" },
        { ColumnField: "ClientName", ColumnHeader:  this.requestTypeName + " Name", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader:  this.requestTypeName + " Status", Type: "text" },
        { ColumnField: "Amount", ColumnHeader:  "Amount", Type: "text" },
        { ColumnField: "AgreedAmount", ColumnHeader:  "Agreed Amount", Type: "text" },
        
      ];
  }


}
