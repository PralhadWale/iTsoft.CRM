import { Component, OnInit, ViewChild } from "@angular/core";



import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
import { RequestDetails } from '../_models/requestdetails';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';

import { RequestService } from '../process/services/request.service';
import { ListService } from '../process/services/list.service';
import { AlertService, StorageService } from '../_services';
import { AssignRequestAvisorComponent } from "../process/assign-request-advisor/assign-request-advisor.component";
import { ConfigurationSettings } from "../_models/configuration";
import { UserRole } from "../_models/userRole";
@Component({
  selector: 'enquiry-list',
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.css"],
})
export class EnquiryListComponent implements OnInit {
@ViewChild("sidenav")  sidenav : MatSidenav;
@ViewChild("assignAdvisor")  assignAdvisor : AssignRequestAvisorComponent;

  pageTitle: string = "Enquiry List";
  
  searchFilter: RequestSerchParameters = new RequestSerchParameters(RequestType.Enquiry);

  enquiryList: Array<any>;
  selectedEnquiryList:Array<RequestDetails>;
  enquiryTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  requestSelectList: RequestSelectListModel = new RequestSelectListModel();
  requestDetails : RequestDetails  = new RequestDetails();


  storageKey = "ENQUIRYFILTER";

  constructor(
    private requestService: RequestService,
    private storageService : StorageService,
    private listService: ListService,
    private alertService: AlertService,
    private router : Router,

  ) {
  
    

  }
 

  ngOnInit(): void {
    this.SetTableSchema();
    this.SetFilter();
    this.LoadSelectListData();
  }


  onCommandClick($event: CommandEventArgs) {
   
    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/enquiries/edit/', rowData.RequestId]);
      }
      else  if ($event.command.content == "transfer") {
        this.selectedEnquiryList =[];
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.requestDetails = rowData;
        this.requestDetails.TransferPendingFollowUp = true;
        this.assignAdvisor.sidenav.open();
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
        this.SetFilter(true);
      }
      else if ($event.toolbarItem == ToolBarItems.Transfer) {
          this.selectedEnquiryList = $event.selectedItems;

          if(this.selectedEnquiryList == null || this.selectedEnquiryList.length == null || this.selectedEnquiryList.length == 0)
          {
            this.alertService.showErrorMessage("Please select at least one enquiry to transfer");
          }
          else 
          {
            this.requestDetails = new RequestDetails();
            
            this.assignAdvisor.sidenav.open();
          }
      }
    }

  }

  private SetFilter(resetToDefault: boolean = false) {
    if (resetToDefault) {
      this.searchFilter = new RequestSerchParameters(RequestType.Enquiry);
    }
    else {
      let filter = this.storageService.GetItem(this.storageKey);
      if (filter != null) {
        this.searchFilter = filter;
      }
      else {
        this.searchFilter = new RequestSerchParameters(RequestType.Enquiry);
      }
    }
    this.getEnquiries();
  }

  resetSearchFilter(sidenav:any)
  {
    this.sidenav.toggle();
  }

  onAssigned()
  {
    this.getEnquiries();
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
    this.storageService.SetItem(this.storageKey,this.searchFilter);
    this.requestService.Search(this.searchFilter).subscribe(result => {
      this.enquiryList = result.Value.ResponseData;

    }, error => { console.log(error); });

  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh , ToolBarItems.Search , ToolBarItems.Transfer];
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit},
      //{ commandType: CommandType.View},
    // { commandType: CommandType.Other,icon:'transfer_within_a_station'}
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true }
    ];

    this.enquiryTableSchema =
      [
        { ColumnField: "RequestNo", ColumnHeader: "Enquiry No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Enquiry Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
        { ColumnField: "FirstName", ColumnHeader: "FirstName", Type: "text" },
        { ColumnField: "PhoneNo2", ColumnHeader: "Phone No 2", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Status", Type: "text" },
        { ColumnField: "Department" , ColumnHeader:"Department", Type:"text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command : gridCommands }
      ];


      if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId !== UserRole.Advisor) {
        this.enquiryTableSchema.unshift({ ColumnField: "IsSelected", ColumnHeader: "", Type: "boolean" })
      }
  
  }


}
