import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmDialog } from '../shared';

import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
import { RequestDetails } from '../_models/requestdetails';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';

import { RequestService } from '../process/services/request.service';
import { ListService } from '../process/services/list.service';
import { AlertService, AuthenticationService, StorageService } from '../_services';
import { AssignRequestAvisorComponent } from '../process/assign-request-advisor/assign-request-advisor.component';
import { UserRole } from '../_models/userRole';
import { ConfigurationSettings } from '../_models/configuration';
import { NgForm } from '@angular/forms/';
import { UserProfilService } from '../_services/userProfile.Service';
import { AddFollowupComponent } from '../process/add-followup/add-followup.component';
import { FollowUpDetails } from '../_models/followupdetails';
import { LeadStatus } from '../_models/leadStatus';

@Component({
  selector: 'quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css'],
  providers: [ConfirmDialog]
})
export class QuotationListComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;
  @ViewChild("addFollowUp") addFollowUp : AddFollowupComponent;
  @ViewChild("assignAdvisor") assignAdvisor: AssignRequestAvisorComponent;
  @ViewChild("quotationForm") quotationForm: NgForm;

  pageTitle: string = 'Quotations';

  searchFilter: RequestSerchParameters = new RequestSerchParameters(RequestType.Quotation);

  storageKey = "QUOTATIONFILTER";
  

  quotationList: Array<any>;
  quotationTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  requestSelectList: RequestSelectListModel = new RequestSelectListModel();
  requestDetails: RequestDetails = new RequestDetails();
  selectedQuotationList: Array<RequestDetails> = [];
  fieldColspan = 6;
  constructor(
    public userProfileService:UserProfilService,
    private requestService: RequestService,
    public listService: ListService,
    private storageService: StorageService,
    private alertService: AlertService,
    private router: Router,

  ) {

  }
  ngOnInit(): void {
    this.LoadSelectListData();
    this.SetTableSchema();
    this.SetFilter();
  }



  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/enquiries/edit/', rowData.RequestId , 0,RequestType.Quotation]);
      }
      else if ($event.command.content == "transfer") {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.selectedQuotationList = [];
        this.requestDetails = rowData;
        this.requestDetails.TransferPendingFollowUp = true;
        this.assignAdvisor.sidenav.open();
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'add')
      {
          
        let rowData: FollowUpDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/quotations/followUp/', rowData.RequestServiceId]);

        // let rowData: FollowUpDetails = Object.assign({}, $event.rowData);
        // this.addFollowUp.followUpDetails = rowData;
        // this.addFollowUp.SetFollowUpDefaultData();
        // this.addFollowUp.sidenav.open();
      }
      else if ($event.command.content == "download") {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        if (rowData.LeadStatusId == LeadStatus.ProposalAccepted) {
          this.requestService.DownloadQuote(rowData.RequestId).subscribe(
            (result: any) => {
              this.downloadPDF(result);
            },
            (error: any) => {
              this.alertService.showErrorMessage("Failed to download due to service error");
            }
          );
        }
        else 
        {
          this.alertService.showWarningMessage("Not allowed");
        }
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/quotations/edit/', 0,0,RequestType.Quotation]);
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.SetFilter(true);
      }
      else if ($event.toolbarItem == ToolBarItems.Transfer) {
        this.selectedQuotationList = $event.selectedItems;

        if (this.selectedQuotationList == null || this.selectedQuotationList.length == null || this.selectedQuotationList.length == 0) {
          this.alertService.showErrorMessage("Please select at least one quotation to transfer");
        }
        else {
          this.requestDetails = new RequestDetails();

          this.assignAdvisor.sidenav.open();
        }
      }
    }

  }

  onFollowUpSaved()
  {
    
  }

  private SetFilter(resetToDefault: boolean = false) {
    if (resetToDefault) {
      this.searchFilter = new RequestSerchParameters(RequestType.Quotation);
    }
    else {
      let filter = this.storageService.GetItem(this.storageKey);
      if (filter != null) {
        this.searchFilter = filter;
      }
      else {
        this.searchFilter = new RequestSerchParameters(RequestType.Quotation);
      }
    }
    this.getQuotations();
    this.GetDepartmentServices(this.searchFilter.DepartmentId);
    if(this.searchFilter.DepartmentId > 0)
    {
      this.GetDepartmentAdvisor(this.searchFilter.DepartmentId);
    }
  }

  resetSearchFilter(sidenav: any) {
    this.SetFilter();
    this.sidenav.toggle();
  }

  onAssigned() {
    this.getQuotations();
  }

  searchQuotations(searchFilter: any) {
    //if (this.quotationForm && this.quotationForm.valid)
     {
      this.getQuotations();
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

  getQuotations() {
    
    this.searchFilter.UserId = this.userProfileService.CurrentUser.UserId;
    if(this.userProfileService.IsAdvisor)
    {
      this.searchFilter.AdvisorId = this.userProfileService.CurrentUser.UserId;
    }

    this.storageService.SetItem(this.storageKey, this.searchFilter);
    this.requestService.Search(this.searchFilter).subscribe(result => {
      this.quotationList = result.Value.ResponseData;
      this.sidenav.close();
    }, error => { this.alertService.showErrorMessage(error.error) });

  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh, ToolBarItems.Search, ToolBarItems.Transfer];

    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit },
      { click: null, commandType: CommandType.Other, icon: 'note_add', content: 'add', style: { 'background-color': 'skyblue', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip : 'Add followup note' },
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' }, customstyle: true  , toolTip : 'Single request transfer'},
      { click: null, commandType: CommandType.Other, icon: 'download_for_offline', content: 'download', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' }, customstyle: true  , toolTip : 'Download Quote'}
    ];

    this.quotationTableSchema =
      [ { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: gridCommands },
        { ColumnField: "RequestNo", ColumnHeader: "Quotation No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Quotation Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "ClientTypeName", ColumnHeader: "Quotation Type", Type: "text" },
        { ColumnField: "ClientName", ColumnHeader: "Quotation Name", Type: "text" },
        { ColumnField: "ServiceName", ColumnHeader: "Service", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Quotation Status", Type: "text" },
        { ColumnField: "DepartmentName" , ColumnHeader:"Department", Type:"text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "QuoatedPrice", ColumnHeader: "Service Rate", Type: "text" }
      ];

    if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId !== UserRole.Advisor) {
      this.quotationTableSchema.unshift({ ColumnField: "IsSelected", ColumnHeader: "", Type: "boolean" })
    }
  }

  
  downloadPDF(data: any){
    var blob = new Blob([data.Value], { type: 'application/pdf' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  
}
