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
        this.router.navigate(['/enquiries/edit/', rowData.RequestId , 0,RequestType.Enquiry]);
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
        this.router.navigate(['/enquiries/followUp/', rowData.RequestServiceId]);
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/enquiries/edit/', 0,0,RequestType.Enquiry]);
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
            let otherDeptService = this.selectedEnquiryList.filter(r => r.DepartmentId != this.selectedEnquiryList[0].DepartmentId);
            if (otherDeptService.length == 0) {
              this.requestDetails = new RequestDetails();
              this.assignAdvisor.sidenav.open();
            }
            else {
              this.alertService.showErrorMessage("Cannot assign different dept services to single dept");
            }
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
    this.GetDepartmentServices(this.searchFilter.DepartmentId);
    if(this.searchFilter.DepartmentId > 0)
    {
      this.GetDepartmentAdvisor(this.searchFilter.DepartmentId);
    }
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
      this.searchFilter.ServiceId = null;
      this.GetDepartmentAdvisor(departmentId);
      this.GetDepartmentServices(departmentId);
    }

  }
  GetDepartmentAdvisor(departmentId: any) {
    this.requestSelectList.Advisors =[];
    this.listService.GetDepartmentAdvisors(departmentId).subscribe((result) => {
        this.requestSelectList.Advisors = result.Value.ResponseData;
    });
  }

  GetDepartmentServices(departmentId: any) {
    this.requestSelectList.Services=[];
    this.listService.GetDepartmentServices(departmentId).subscribe((result) => {
        this.requestSelectList.Services = result.Value.ResponseData;
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
    if (this.userProfileService.CurrentUser.RoleId == UserRole.Admin || this.userProfileService.CurrentUser.RoleId == UserRole.Manager) {
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh, ToolBarItems.Search, ToolBarItems.Transfer];
    }
    else {
      this.tableSettings.ToolBarItems = [ToolBarItems.Refresh, ToolBarItems.Search, ToolBarItems.Transfer];
    }
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit},
      //{ commandType: CommandType.View},
      { click: null, commandType: CommandType.Other, icon: 'note_add', content: 'add', style: { 'background-color': 'skyblue', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip:'Add follow note' },
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip: 'Single request transfer'}
    ];

    this.enquiryTableSchema =
      [
        { ColumnField: "$$edit", ColumnHeader: "Action", Type: "text" , Command : gridCommands },
        { ColumnField: "RequestNo", ColumnHeader: "Enquiry No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Enquiry Date", Type: "date" },
        { ColumnField: "NextFollowupDate", ColumnHeader: "Follow up Date", Type: "date" } ,   
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "ClientTypeName", ColumnHeader: "Enq. Type", Type: "text" },
        { ColumnField: "ClientName", ColumnHeader: "Enq. Name", Type: "text" },
        { ColumnField: "ServiceName", ColumnHeader: "Service", Type: "text" },
        { ColumnField: "FinancialYear", ColumnHeader: "Financial Year", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Enq. Status", Type: "text" },
        { ColumnField: "DepartmentName" , ColumnHeader:"Department", Type:"text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "ServiceQuotedPrice", ColumnHeader: "Service Rate", Type: "text" },
        { ColumnField: "ServiceQuotedDicountAmount", ColumnHeader: "Discount", Type: "text" },
        { ColumnField: "ServiceQuotedNetAmount", ColumnHeader: "Quoted Rate", Type: "text" }
        
      ];


      if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId !== UserRole.Advisor) {
        this.enquiryTableSchema.unshift({ ColumnField: "IsSelected", ColumnHeader: "", Type: "boolean" })
      }
  
  }


}
