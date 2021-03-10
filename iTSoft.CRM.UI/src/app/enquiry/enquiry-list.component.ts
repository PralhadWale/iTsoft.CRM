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
import { NgForm } from "@angular/forms/";
import { UserProfilService } from "../_services/userProfile.Service";
import { AddFollowupComponent } from "../process/add-followup/add-followup.component";
import { FollowUp } from "../_models/followup";
import { FollowUpDetails } from "../_models/followupdetails";
@Component({
  selector: 'enquiry-list',
  templateUrl: "./enquiry-list.component.html",
  styleUrls: ["./enquiry-list.component.scss"],
})
export class EnquiryListComponent implements OnInit {
@ViewChild("sidenav")  sidenav : MatSidenav;
@ViewChild("addFollowUp") addFollowUp : AddFollowupComponent;
@ViewChild("enquiryForm") enquiryForm : NgForm;
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
  fieldColspan = 6;
  constructor(
    private userProfileService:UserProfilService,
    private requestService: RequestService,
    private storageService : StorageService,
    public listService: ListService,
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
        this.router.navigate(['/enquiries/edit/', rowData.RequestId , 0]);
      }
      else  if ($event.command.content == "transfer") {
        this.selectedEnquiryList =[];
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.requestDetails = rowData;
        this.requestDetails.TransferPendingFollowUp = true;
        this.assignAdvisor.sidenav.open();
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'add')
      {
        
        let rowData: FollowUpDetails = Object.assign({}, $event.rowData);
        this.addFollowUp.followUpDetails = rowData;
        this.addFollowUp.SetFollowUpDefaultData();
        this.addFollowUp.sidenav.open();
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/enquiries/edit/', 0,0]);
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
    this.SetFilter();
    this.sidenav.toggle();
  }

  onAssigned()
  {
    this.getEnquiries();
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

  
  onDepartmentChanged($event: any) {
    if ($event != null) {
      let departmentId = $event.value;
      this.searchFilter.AdvisorId = null;
      this.GetDepartmentAdvisor(departmentId);
    }

  }
  GetDepartmentAdvisor(departmentId: any) {
    this.listService.GetDepartmentAdvisors(departmentId).subscribe((result) => {
        this.requestSelectList.Advisors = result.Value.ResponseData;
    });
  }


  getEnquiries() {
 
    this.searchFilter.UserId = this.userProfileService.CurrentUser.UserId;
    if(this.userProfileService.IsAdvisor)
    {
      this.searchFilter.AdvisorId = this.userProfileService.CurrentUser.UserId;
    }

    this.storageService.SetItem(this.storageKey,this.searchFilter);
    this.requestService.Search(this.searchFilter).subscribe(result => {
      this.enquiryList = result.Value.ResponseData;
      if(this.sidenav)
      {
        this.sidenav.close()
      }
    }, error => { console.log(error); });

  }

  onFollowUpSaved() {
    //this.getFollowUp();
}


  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh , ToolBarItems.Search , ToolBarItems.Transfer];
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit},
      //{ commandType: CommandType.View},
      { click: null, commandType: CommandType.Other, icon: 'queue', content: 'add', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip:'Add follow up info' },
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip: 'Transfer'}
    ];

    this.enquiryTableSchema =
      [
        { ColumnField: "RequestNo", ColumnHeader: "Enquiry No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Enquiry Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
        { ColumnField: "FirstName", ColumnHeader: "FirstName", Type: "text" },
        { ColumnField: "ServiceName", ColumnHeader: "Service", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Status", Type: "text" },
        { ColumnField: "Department" , ColumnHeader:"Department", Type:"text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "ServiceRate", ColumnHeader: "Service Rate", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command : gridCommands }
      ];


      if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId !== UserRole.Advisor) {
        this.enquiryTableSchema.unshift({ ColumnField: "IsSelected", ColumnHeader: "", Type: "boolean" })
      }
  
  }


}
