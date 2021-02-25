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
import {  BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { CommandEventArgs,  TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';

import { RequestMaster } from '../_models';
import { RequestViewModel } from '../_models/requestviewmodel';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';
import { RequestType } from '../_models/requesttype';

import { RequestService } from '../process/services/request.service';
import { AlertService } from '../_services';
import { ListService } from '../process/services/list.service';

import { AddFollowupComponent } from '../process/add-followup/add-followup.component';

import { NumberValidators } from "../shared/number.validator";
import { GenericValidator } from "../shared/generic-validator";


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
    `],
})
export class EnquiryFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
  @ViewChildren("enquiryForm") enquiryForm: FormGroup;
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
  tableSettings: TableDefaultSettings;
  minDate : Date = new Date(1800,1,1);
  maxDate : Date = new Date();
  enqMinDate : Date = new Date(2020,1,1);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: RequestService,
    private listService: ListService,
    private alertService : AlertService,
    private breakpointObserver: BreakpointObserver
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

  getRequest(requestId: number): void {
    if(requestId > 0)
    {
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

      this.requestService.GetNextrequestNumber(this.requestTypeId).subscribe((result)=>{
        var data = result.Value.ResponseData;
        this.request.RequestMaster.RequestNo = data;
        this.onEnquiryRetrieved(this.request)
      },  (error: any) => (this.alertService.showErrorMessage(error)));
     
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
  }

  onCommandClick($event: CommandEventArgs) {
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
    this.getRequest(this.request.RequestMaster.RequestId);
}

  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = <RequestSelectListModel>result.Value.ResponseData;
        },
        (error: any) => (this.alertService.showErrorMessage(error)),
        () => {
          this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getRequest(id);
            }
        );
        }
      );
  }

  SetDefaultRequest() {
    
    this.request = new RequestViewModel();
  
  }

  SetTableSchema() {

    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add];
  

   
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
