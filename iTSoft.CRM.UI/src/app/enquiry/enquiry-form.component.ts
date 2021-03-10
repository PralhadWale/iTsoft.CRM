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

import { CommandEventArgs, CommandModel, CommandType, ITMatTableComponent, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';

import { RequestMaster } from '../_models';
import { RequestViewModel } from '../_models/requestviewmodel';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';
import { RequestType } from '../_models/requesttype';

import { RequestService } from '../process/services/request.service';
import { AlertService, StorageService } from '../_services';
import { ListService } from '../process/services/list.service';

import { AddFollowupComponent } from '../process/add-followup/add-followup.component';

import { NumberValidators } from "../shared/number.validator";
import { GenericValidator } from "../shared/generic-validator";
import { ConfirmDialog } from "../shared/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddServiceComponent } from "../process/add-service/add-service.component";
import { RequestServiceDetails } from "../_models/requestservice";
import { ClientMaster } from "../masters/client/client.model";


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
  pageTitle: string = "Update Enquiry";
  request: RequestViewModel;
  showImage: boolean;
  fieldColspan = 4;
  requestTypeId = RequestType.Enquiry;
  // Use with the generic validation messcustomerId class

  private sub: Subscription;

  requestSelectList: RequestSelectListModel
  followUpTableSchema: Array<TableColumnModel> = [];
  serviceTableSchema: Array<TableColumnModel> = [];

  followupTableSettings: TableDefaultSettings;
  serviceTableSettings: TableDefaultSettings;

  minDate: Date = new Date(1800, 1, 1);
  maxDate: Date = new Date();
  enqMinDate: Date = new Date(2020, 1, 1);
  selectedIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private listService: ListService,
    private alertService: AlertService,

    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
  ) {

    this.requestSelectList = new RequestSelectListModel();

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
          this.router.navigate(['/enquiries']);
        }
      }
      );
    }
    else {
      this.router.navigate(['/enquiries']);
    }
  }

  getRequest(requestId: number , clientId : number): void {
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
          var clientDetails = <ClientMaster>result.Value.ResponseData;
          if (clientDetails.CorporateName != null)
            this.request.RequestMaster.CompanyName = clientDetails.CorporateName;
          else if (clientDetails.FirstName != null)
            this.request.RequestMaster.FirstName = clientDetails.LastName;
          this.request.RequestMaster.MiddleName = clientDetails.MiddleName;
          this.request.RequestMaster.LastName = clientDetails.LastName;
          this.request.RequestMaster.DOB = clientDetails.DoB;

          this.request.RequestMaster.Email = clientDetails.Email;
          this.request.RequestMaster.PhoneNo1 = clientDetails.MobileNo;

          this.request.RequestMaster.SourceId = 2;

        });
      }

    }
  }


  onEnquiryRetrieved(request: RequestViewModel): void {

    this.request = request;

    if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
      this.pageTitle = "Add Enquiry";
    } else {
      this.pageTitle = `Update Enquiry: ${this.request.RequestMaster.RequestNo} `;
    }


  }

  saveEnquiry(enquiryForm: NgForm) {
    if (enquiryForm && enquiryForm.valid) {
      this.request.RequestMaster.RequestTypeId = RequestType.Enquiry;
      this.requestService.Save(this.request).subscribe(result => {
        this.alertService.showSuccessMessage("Enquiry Saved successfully");
        this.SetDefaultRequest();
        this.router.navigate(['/enquiries']);
      }, (error: any) => {
        this.alertService.showSuccessMessage("Failed to save");
      });
    }
    else {
      this.selectedIndex = 0
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
    if ($event.toolbarItem) {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.OpenServiceDialog(null);
      }
    }
    else {
      let rowData: RequestServiceDetails = Object.assign({}, $event.rowData);
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
                this.requestService.RemoveService(rowData,this.request.RequestServiceDetails);
                this.serviceTable.RefreshDataSource();
          }
        }
        );

      }

    }
  }
  OpenServiceDialog(serviceDetails: RequestServiceDetails) {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: { ServiceDetails: serviceDetails, AllServiceList: this.request.RequestServiceDetails, ShowPrice: false },
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
        else 
        {
            this.requestService.UpdateService(result.Data,this.request.RequestServiceDetails);
        }

        this.request.RequestMaster.Amount = 0;
        this.request.RequestServiceDetails.forEach(x => {
          if (x.QuoatedPrice && x.QuoatedPrice > 0) {
            this.request.RequestMaster.Amount += x.QuoatedPrice;
          }
        });
        this.serviceTable.RefreshDataSource();

      }
      else {

      }
    }
    );
  }

  onFollowUpSaved() {
    this.getRequest(this.request.RequestMaster.RequestId,this.request.RequestMaster.ClientId);
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
              this.getRequest(id,clientId);
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
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
      ];

    this.serviceTableSchema =
      [
        { ColumnField: "ServiceName", ColumnHeader: "Service Name", Type: "text" },
        { ColumnField: "DepartmentName", ColumnHeader: "Department Name", Type: "text" },
        { ColumnField: "QuoatedPrice", ColumnHeader: "Price", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Lead Status", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Lead Stage", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: serviceGridCommand }
      ];

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
