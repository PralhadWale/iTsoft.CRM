import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
  ViewChild,

} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,
  NgForm,
  FormControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { ConfirmDialog } from "../shared/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { CommandEventArgs, CommandModel, CommandType, ITMatTableComponent, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';

import { AddFollowupComponent } from '../process/add-followup/add-followup.component';
import { AddServiceComponent } from "../process/add-service/add-service.component";

import { RequestViewModel } from '../_models/requestviewmodel';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';
import { RequestType } from '../_models/requesttype';
import { ClientMaster } from "../masters/client/client.model";
import { LeadStatus } from "../_models/leadStatus";
import { RequestServiceDetails } from "../_models/requestservice";

import { RequestService } from '../process/services/request.service';
import { AlertService, StorageService } from '../_services';
import { ListService } from '../process/services/list.service';
import { UserProfilService } from "../_services/userProfile.Service";
import { ContactPersonMaster } from "../_models/contactPerson";
import { ClientType } from "../_models/clientType";
import { ResponseCode } from "../core/models/ServiceResponse.model";
import { OrganizationMaster } from "../_models/organization";
import { ClientViewModel } from "../_models/clientViewModel";





@Component({
  selector: 'enquiry-form',
  templateUrl: "./enquiry-form.component.html",
  styles: [`
  .title-spacer {
      flex: 1 1 auto;
    }
  .form-field{
      width: 100%;
      margin-left: 20px;
      margin-right: 20px;
    }
    .mat-tab-label {
      border: 1px solid palevioletred;
      border-top-left-radius: .95rem;
      border-top-right-radius: .95rem;
     width: 200px;
  }
  
  .mat-tab-label-active {
     color: #495057;
      background-color: #fff;
      border-color: #dee2e6 #dee2e6 #fff;
     
  }
  
  .mat-ink-bar {
    display: none;
  }
    `],
})
export class EnquiryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
  @ViewChildren("enquiryForm") enquiryForm: FormGroup;
  @ViewChild("serviceTable") serviceTable: ITMatTableComponent;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = "Update";
  request: RequestViewModel;
  showImage: boolean;
  fieldColspan = 4;
  requestTypeId =0;
  allowSave : boolean = true;
  // Use with the generic validation messcustomerId class

  private sub: Subscription;

  requestSelectList: RequestSelectListModel
  followUpTableSchema: Array<TableColumnModel> = [];
  serviceTableSchema: Array<TableColumnModel> = [];

  followupTableSettings: TableDefaultSettings;
  serviceTableSettings: TableDefaultSettings;

  minDate: Date = new Date(1900, 1, 1);
  maxDate: Date = new Date();
  enqMinDate: Date = new Date(2020, 1, 1);
  dobMinDate:Date = new Date(1900,1,1);
  dobMaxDate:Date = new Date();
  selectedIndex = 0;
  requestTypeName : string = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private listService: ListService,
    private alertService: AlertService,
    private userProfileService: UserProfilService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
  ) {

    this.requestSelectList = new RequestSelectListModel();
    this.dobMaxDate.setFullYear(this.dobMaxDate.getFullYear()-18);
    this.LoadSelectListData();
    this.SetDefaultRequest();
    this.SetTableSchema();
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.onScreensizeChange();
    });

  }


  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {

  }

  Close(employeeForm: NgForm) {
    if (employeeForm.touched) {

      let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to cancel editing ? " };
      const dialogRef = this.dialog.open(ConfirmDialog, {
        maxWidth: "400px",
        data: dialogData
      });

      dialogRef.afterClosed().subscribe(dialogResult => {
        let result = dialogResult;
        if (result == "CONFIRMED") {
          this.NavigateToList();
         
        }
      }
      );
    }
    else {
      this.NavigateToList();
    }
  }
 
  getRequest(requestId: number, clientId: number): void {
    if (requestId > 0) {
      this.requestService
        .Load(requestId)
        .subscribe(
          (result) => {
            var data = <RequestViewModel>result.Value.ResponseData;
            this.onEnquiryRetrieved(data)
          },
          (error: any) => (this.alertService.showErrorMessage(error))
        );
    }
    else {

      this.requestService.GetNextrequestNumber(this.requestTypeId).subscribe((result) => {
        var data = result.Value.ResponseData;
        this.request.RequestMaster.RequestNo = data;
        this.onEnquiryRetrieved(this.request)
      }, (error: any) => (this.alertService.showErrorMessage(error)));

      if (clientId > 0) {
        this.requestService.FindClient(clientId).subscribe((result) => {
          var clientDetails = <ClientViewModel>result.Value.ResponseData;
          if (clientDetails.ClientMaster.ClientTypeId == ClientType.Corporate) {
            this.request.OrganizationMaster = clientDetails.OrganizationMaster;
          }
         
          this.request.RequestMaster.ClientId = clientDetails.ClientMaster.ClientId;
          this.request.ContactPersonMaster = clientDetails.ContactPersonMasters[0];
          this.request.RequestMaster.ClientTypeId = clientDetails.ClientMaster.ClientTypeId.toString();

          this.request.RequestMaster.SourceId = 2;

        });
      }

    }
  }


  onEnquiryRetrieved(request: RequestViewModel): void {

    this.request = request;

    if(this.request.RequestMaster.ClientTypeId)
    {
      this.request.RequestMaster.ClientTypeId=this.request.RequestMaster.ClientTypeId.toString();
    }
    if (this.request.ContactPersonMasters && this.request.ContactPersonMasters.length > 0) {
      this.request.ContactPersonMaster = this.request.ContactPersonMasters[0];
    }
    else {
      this.request.ContactPersonMaster = new ContactPersonMaster();
    }

    this.requestTypeName = this.requestTypeId == RequestType.Enquiry ? "Enquiry" : "Quotation"
    if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
      this.pageTitle = "Add " + this.requestTypeName;
    }
    else
    {
      this.pageTitle = 'Update ' + this.requestTypeName + ' : ' + this.request.RequestMaster.RequestNo;
      if (
        (this.request.RequestMaster.RequestTypeId == RequestType.Enquiry &&
          (this.request.RequestMaster.StatusId == LeadStatus.Converted || this.request.RequestMaster.StatusId == LeadStatus.Dropped))
        || (this.request.RequestMaster.RequestTypeId == RequestType.Quotation &&
          (this.request.RequestMaster.StatusId == LeadStatus.ProposalAccepted || this.request.RequestMaster.StatusId == LeadStatus.ProposalDropped))
      ) {
        this.allowSave = false;
      }
    }

    if(this.request.OrganizationMaster == null)
    {
      this.request.OrganizationMaster = new OrganizationMaster();
    }


    if(this.request.RequestMaster.ParentRequestId > 0)
    {
      this.serviceTableSettings.ShowToolBar = false;
      this.allowSave = false;
    }
  }

  saveEnquiry(enquiryForm: NgForm) {
    if (enquiryForm && enquiryForm.valid) {
      this.request.RequestMaster.RequestTypeId = this.requestTypeId;
      this.requestService.Save(this.request).subscribe(result => {


        let response= result.Value;
        if (response.ResponseCode == ResponseCode.Success) {
  
          if (response.ResponseData.RequestNo && response.ResponseData.RequestNo != '') {
             this.alertService.showInfoMessage("Saved successfully. "+ this.requestTypeName +" numbered " + response.ResponseData.RequestNo + " created.",
             10000);
          }
          else {
            this.alertService.showSuccessMessage("Request Saved successfully");
          }

                 
          this.SetDefaultRequest();
          this.NavigateToList();
        }
        else {
          this.alertService.showErrorMessage("Failed to save due to application error");
        }
       
      }, (error: any) => {
        this.alertService.showSuccessMessage("Failed to save");
      });
    }
    else {
      this.selectedIndex = 0
      if((<any>this.enquiryForm).first.controls.ClientTypeId.invalid)
      {
        this.alertService.showErrorMessage("Please select valid client type");
      }
    }
  }

  onFollowUpCommandClick($event: CommandEventArgs) {
    if ($event.toolbarItem) {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.addFollowUp.requestId = this.request.RequestMaster.RequestId;
        this.addFollowUp.requestNo = this.request.RequestMaster.RequestNo;
        this.addFollowUp.SetFollowUpDefaultData();
        this.addFollowUp.sidenav.open();
      }
    }
  }

  onServiceCommandClick($event: CommandEventArgs) {

    if(!this.allowSave)
      return;

   if(this.request.RequestMaster.ParentRequestId > 0)
   {
      this.alertService.showInfoMessage("Not allowed");
      return;
   }

    if ($event.toolbarItem) {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.OpenServiceDialog(null);
      }
    }
    else {
      let rowData: RequestServiceDetails = Object.assign({}, $event.rowData);
      if (!(rowData.RequestServiceId > 0 && (rowData.LeadStatusId == LeadStatus.ProposalAccepted || rowData.LeadStatusId == LeadStatus.Converted || rowData.LeadStatusId == LeadStatus.Dropped || rowData.LeadStatusId == LeadStatus.ProposalDropped))) {
        this.userProfileService.IsUserDepartment(rowData.DepartmentId).subscribe((result) => {
          if (result == true) {
            if ($event.command.commandType == CommandType.Edit) {
              this.OpenServiceDialog(rowData);
            }
            else if ($event.command.commandType == CommandType.Delete) {

              let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to Delete selected service ? " };
              const dialogRef = this.dialog.open(ConfirmDialog, {
                maxWidth: "400px",
                data: dialogData
              });

              dialogRef.afterClosed().subscribe(dialogResult => {
                let result = dialogResult;
                if (result == "CONFIRMED") {
                  this.requestService.RemoveService(rowData, this.request.RequestServiceDetails);
                  this.serviceTable.RefreshDataSource();
                }
              }
              );

            }
          }
          else 
          {
            this.alertService.showErrorMessage("You are not authorize to modify service of this department");
          }
        });
      }
      else {
        this.alertService.showWarningMessage("Action not allowed");
      }

    }
  }
  OpenServiceDialog(serviceDetails: RequestServiceDetails) {
    let showPrice : boolean = false;
    if(this.requestTypeId == RequestType.Quotation)
    {
      showPrice = true;
    }

    let showNumberOfEmployees : boolean = false;
    if(this.request.RequestMaster.ClientTypeId == ClientType.Corporate.toString())
    {
        showNumberOfEmployees = true;
    }

    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: {requestTypeId : this.requestTypeId, ServiceDetails: serviceDetails, AllServiceList: this.request.RequestServiceDetails, ShowPrice: showPrice , ShowNumberOfEmployees : showNumberOfEmployees },
      disableClose: true
    });

    dialogRef.beforeClosed().subscribe(dialogResult => {
      let result = dialogResult;
      if (result && result.Action == "SAVE") {

        if (this.request.RequestServiceDetails == null) {
          this.request.RequestServiceDetails = [];
        }

        if (serviceDetails == null) {
          this.request.RequestServiceDetails.push(result.Data);
        }
        else {
          this.requestService.UpdateService(result.Data, this.request.RequestServiceDetails);
        }

        this.request.RequestMaster.TotalQuotedAmount = 0;
        this.request.RequestMaster.TotalQuotedDiscountAmount = 0;
        this.request.RequestMaster.TotalQuotedNetAmount = 0;
        this.request.RequestMaster.TotalAgreedDiscountAmount = 0;
        this.request.RequestMaster.TotalAgreedNetAmount = 0;

        this.request.RequestServiceDetails.forEach(x => {
          this.request.RequestMaster.TotalQuotedAmount = x.ServiceTotalQuotedPrice;
          this.request.RequestMaster.TotalQuotedDiscountAmount = x.ServiceTotalQuotedDicountAmount;
          this.request.RequestMaster.TotalQuotedNetAmount = x.ServiceTotalQuotedNetAmount;
          this.request.RequestMaster.TotalAgreedDiscountAmount = x.ServiceTotalAgreedDiscountAmount;
          this.request.RequestMaster.TotalAgreedNetAmount = x.ServiceTotalAgreedNetAmount;
        });


        this.serviceTable.RefreshDataSource();

      }
      else {

      }
    }
    );
  }

  onFollowUpSaved() {
    this.getRequest(this.request.RequestMaster.RequestId, this.request.RequestMaster.ClientId);
  }

  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = result;
        },
        (error: any) => (this.alertService.showErrorMessage(error)),
        () => {
          this.route.params.subscribe(
            params => {
              let id = +params['id'];
              let clientId = +params['clientId'];
              this.requestTypeId = +params["requestTypeId"];
              this.SetTableSchema();

              this.getRequest(id, clientId);
            }
          );
        }
      );
  }

  SetDefaultRequest() {
    this.request = new RequestViewModel();
  }

  SetTableSchema() {

    this.followupTableSettings = new TableDefaultSettings();
    this.followupTableSettings.ShowToolBar = true;
    this.followupTableSettings.ToolBarItems = [ToolBarItems.Add];
    this.followupTableSettings.HideFilter = true;

    this.serviceTableSettings = new TableDefaultSettings();

    this.serviceTableSettings.ShowToolBar = true;
    this.serviceTableSettings.ToolBarItems = [ToolBarItems.Add];
    this.serviceTableSettings.HideFilter = true;
    //this.serviceTableSettings.AllowPaging = false;

    let serviceGridCommand: Array<CommandModel> = [
      { commandType: CommandType.Edit },
      { commandType: CommandType.Delete }
    ];


    this.followUpTableSchema =
      [
        { ColumnField: "AddedOn", ColumnHeader: "Created Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Deal Status", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Employee Name", Type: "text" },
        { ColumnField: "Attempt", ColumnHeader: "Attempt", Type: "text" },
        { ColumnField: "ClientRating", ColumnHeader: "Client Rating", Type: "text" },
        { ColumnField: "ServiceQuotedPrice", ColumnHeader: "Service Rate", Type: "text" },
        { ColumnField: "ServiceQuotedDicountAmount", ColumnHeader: "Discount", Type: "text" },
        { ColumnField: "ServiceQuotedNetAmount", ColumnHeader: "Quoted Rate", Type: "text" },
        { ColumnField: "ServiceTotalQuotedPrice", ColumnHeader: "Total Service Rate", Type: "text" },
        { ColumnField: "ServiceTotalQuotedDicountAmount", ColumnHeader: "Total Discount", Type: "text" },
        { ColumnField: "ServiceTotalQuotedNetAmount", ColumnHeader: "Total Quoted Rate", Type: "text" }
      ];




    this.serviceTableSchema =
      [
        { ColumnField: "ServiceName", ColumnHeader: "Service Name", Type: "text" },
        { ColumnField: "FinancialYear", ColumnHeader: "Financial Year", Type: "text" },
        { ColumnField: "DepartmentName", ColumnHeader: "Department Name", Type: "text" },
        { ColumnField: "ServiceQuotedPrice", ColumnHeader: "Service Rate", Type: "text" },
        { ColumnField: "ServiceQuotedDicountAmount", ColumnHeader: "Discount", Type: "text" },
        { ColumnField: "ServiceQuotedNetAmount", ColumnHeader: "Quoted Rate", Type: "text" },
        { ColumnField: "NoOfEmployees", ColumnHeader: "No Of Employees", Type: "text" },
        { ColumnField: "LeadSourceName", ColumnHeader: "Lead Source", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Lead Status", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Lead Stage", Type: "text" },
        { ColumnField : "NextFollowupDate" , ColumnHeader:"Next Follow up date" , Type: "date"},
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "ServiceTotalQuotedPrice", ColumnHeader: "Total Service Rate", Type: "text" },
        { ColumnField: "ServiceTotalQuotedDicountAmount", ColumnHeader: "Total Discount", Type: "text" },
        { ColumnField: "ServiceTotalQuotedNetAmount", ColumnHeader: "Total Quoted Rate", Type: "text" }

      ];

    if (this.requestTypeId == RequestType.Quotation) {

      this.serviceTableSchema.splice(8, 0, { ColumnField: "ServiceAgreedDiscountAmount", ColumnHeader: "Agreed Discount", Type: "text" },)
      this.serviceTableSchema.splice(9, 0, { ColumnField: "ServiceAgreedNetAmount", ColumnHeader: "Agreed Amount", Type: "text" },)

      this.serviceTableSchema.push({ ColumnField: "ServiceTotalAgreedDiscountAmount", ColumnHeader: "Total Agreed Amount", Type: "text" },)
      this.serviceTableSchema.push({ ColumnField: "ServiceTotalAgreedNetAmount", ColumnHeader: "Toal Agreed Discount", Type: "text" },)

    }
    
    if(this.allowSave)
    {
      this.serviceTableSchema.push({ ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: serviceGridCommand });
    }

  }

  NavigateToList() {
    if (this.requestTypeId == RequestType.Enquiry) {
      this.router.navigate(['/enquiries']);
    }
    else if (this.requestTypeId == RequestType.Quotation) {
      this.router.navigate(['/quotations']);
    }
  }

  onScreensizeChange() {
    // debugger
    const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
    console.log(
      ` isLess600  ${isLess600} 
        isLess1000 ${isLess1000}  `
    )
    if (isLess1000) {
      if (isLess600) {
        this.fieldColspan = 12;
      }
      else {
        this.fieldColspan = 6;
      }
    }
    else {
      this.fieldColspan = 3;
    }
  }

}
