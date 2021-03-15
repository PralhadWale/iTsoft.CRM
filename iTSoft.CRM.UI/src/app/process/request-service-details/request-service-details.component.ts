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

import { MatDialog } from "@angular/material/dialog";
import { CommandEventArgs, CommandModel, CommandType, ITMatTableComponent, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../../shared/table-layout/it-mat-table.component';

import { AddFollowupComponent } from '../add-followup/add-followup.component';
import { RequestViewModel } from "src/app/_models/requestviewmodel";
import { RequestService } from "../services/request.service";
import { UserProfilService } from "src/app/_services/userProfile.Service";
import { RequestType } from "src/app/_models/requesttype";
import { ConfirmDialog } from "src/app/shared";
import { AlertService } from "src/app/_services";
import { ContactPersonMaster } from "src/app/_models/contactPerson";


@Component({
  selector: 'request-service-details',
  templateUrl: "./request-service-details.component.html",
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
export class RequestServiceDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
  @ViewChildren("enquiryForm") enquiryForm: FormGroup;
  @ViewChild("serviceTable") serviceTable: ITMatTableComponent;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  pageTitle: string = "Update";
  request: RequestViewModel;
  showImage: boolean;
  fieldColspan = 4;
  requestTypeId =0;
  // Use with the generic validation messcustomerId class
  private sub: Subscription;
  followUpTableSchema: Array<TableColumnModel> = [];
  followupTableSettings: TableDefaultSettings;
  selectedIndex = 0;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private alertService: AlertService,
    private userProfileService: UserProfilService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
  ) {

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

    this.route.params.subscribe(
      params => {
        let requestServiceId = +params['requestServiceId'];
        this.getRequestService(requestServiceId);
      }
    );

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
 
  getRequestService(requestServiceId: number): void {
    if (requestServiceId > 0) {
      this.requestService
        .LoadRequestService(requestServiceId)
        .subscribe(
          (result) => {
            var data = <RequestViewModel>result.Value.ResponseData;
            this.onEnquiryRetrieved(data)
          },
          (error: any) => (this.alertService.showErrorMessage(error))
        );
    }
    else {
      this.NavigateToList();
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

    let requestTypeName: string = this.requestTypeId == RequestType.Enquiry ? "Enquiry" : "Quotation"
    if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
      this.pageTitle = "Add " + requestTypeName;
    } else {
      this.pageTitle = 'Update ' + requestTypeName + ' : ' + this.request.RequestMaster.RequestNo;
    }


  }

  saveEnquiry(enquiryForm: NgForm) {
    if (enquiryForm && enquiryForm.valid) {
      this.request.RequestMaster.RequestTypeId = this.requestTypeId;
      this.requestService.Save(this.request).subscribe(result => {
        this.alertService.showSuccessMessage("Request Saved successfully");
        this.SetDefaultRequest();
        this.NavigateToList();
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


  onFollowUpSaved() {
    this.getRequestService(this.request.RequestMaster.RequestId);
    this.NavigateToList();
  }

  SetDefaultRequest() {
    this.request = new RequestViewModel();
  }

  SetTableSchema() {

    this.followupTableSettings = new TableDefaultSettings();
    this.followupTableSettings.ShowToolBar = true;
    this.followupTableSettings.ToolBarItems = [ToolBarItems.Add];
    this.followupTableSettings.HideFilter = true;

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
