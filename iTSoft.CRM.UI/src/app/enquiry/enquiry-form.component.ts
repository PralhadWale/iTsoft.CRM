import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,

} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlName,

} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { NumberValidators } from "../shared/number.validator";
import { GenericValidator } from "../shared/generic-validator";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { RequestService } from '../process/services/request.service';
import { ListService } from '../process/services/list.service';
import { RequestViewModel } from '../_models/requestviewmodel';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';
import { RequestMaster } from '../_models';
import { RequestType } from '../_models/requesttype';
import { AlertService } from '../_services';

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
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[];
  pageTitle: string = "Update Enquiry";
  errorMessage: string;
  enquiryForm: FormGroup;
  request: RequestViewModel;
  showImage: boolean;
  fieldColspan = 4;

  // Use with the generic validation messcustomerId class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } } = {
    reference: {
      required: "Enquiry reference is required.",
      minlength: "Enquiry reference must be at least one characters.",
      maxlength: "Enquiry reference cannot exceed 100 characters."
    },
    amount: {
      required: "Enquiry amount is required.",
      range:
        "Amount of the enquiry must be between 1 (lowest) and 9999 (highest)."
    },
    quantity: {
      required: "Enquiry quantity is required.",
      range:
        "Quantity of the enquiry must be between 1 (lowest) and 20 (highest)."
    },
    customerId: {
      required: "Customer is required."
    }
  };
  private sub: Subscription;
  private genericValidator: GenericValidator;

  requestSelectList: RequestSelectListModel
  followUpTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;

  constructor(
    private fb: FormBuilder,
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

    this.genericValidator = new GenericValidator(this.validationMessages);
  }


  ngOnInit(): void {
    this.enquiryForm = this.fb.group({
      RequestId: [""],
      RequestNo: [""],
      RequestDate: [""],
      Title: [""],
      CustomerName: ["", [Validators.required]],
      CompanyName: [""],
      Website: [""],
      Email: [""],
      Designation: [""],
      PhoneNo1: [""],
      PhoneNo2: [""],
      DOB: [""],
      Address: [""],
      SourceId: [""],
      LeadStatusId: [""],
      StageId: [""],
      TermsAndCondition: [""],
      Amount: ["", [Validators.required, NumberValidators.range(1, 99999)]],
      ClientBehaviourId: [""]

    });

    this.sub = this.route.params.subscribe(
      params => {
          let id = +params['id'];
          this.getRequest(id);
      }
  );


  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    let controlBlurs: Observable<any>[] = this.formInputElements.map(
      (formControl: ElementRef) =>
        Observable.fromEvent(formControl.nativeElement, "blur")
    );

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.enquiryForm.valueChanges, ...controlBlurs)
      .debounceTime(800)
      .subscribe(() => {
        this.displayMessage = this.genericValidator.processMessages(
          this.enquiryForm
        );
      });
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
        (error: any) => (this.errorMessage = <any>error)
      );
    }
    else {
      this.onEnquiryRetrieved(this.request);
    }
  }


  onEnquiryRetrieved(request: RequestViewModel): void {
    if (this.enquiryForm) {
      this.enquiryForm.reset();
    }
    this.request = request;

    if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
      this.pageTitle = "Add Enquiry";
    } else {
      this.pageTitle = `Update Enquiry: ${this.request.RequestMaster.RequestNo} `;
    }

    // Update the data on the form
    this.enquiryForm.patchValue({
      RequestId: this.request.RequestMaster.RequestId,
      RequestNo: this.request.RequestMaster.RequestNo,
      RequestDate: this.request.RequestMaster.RequestDate != null ? new Date(this.request.RequestMaster.RequestDate): new Date(),
      Title: this.request.RequestMaster.Title,
      CustomerName: this.request.RequestMaster.CustomerName,
      CompanyName: this.request.RequestMaster.CompanyName,
      Website: this.request.RequestMaster.Website,
      Email: this.request.RequestMaster.Email,
      Designation: this.request.RequestMaster.Designation,
      PhoneNo1: this.request.RequestMaster.PhoneNo1,
      PhoneNo2: this.request.RequestMaster.PhoneNo2,
      DOB: new Date(this.request.RequestMaster.DOB),
      Address: this.request.RequestMaster.Address,
      SourceId: this.request.RequestMaster.SourceId,
      LeadStatusId: this.request.RequestMaster.LeadStatusId,
      StageId: this.request.RequestMaster.StageId,
      TermsAndCondition: this.request.RequestMaster.TermsAndCondition,
      Amount: this.request.RequestMaster.Amount,
      ClientBehaviourId: this.request.RequestMaster.ClientBehaviourId,
    });

  }

  saveEnquiry() {

    let request = new RequestViewModel();
    request.RequestMaster = <RequestMaster>this.enquiryForm.value;
    request.RequestMaster.RequestTypeId = RequestType.Enquiry;
    this.requestService.Save(request).subscribe(result => {
      this.alertService.showSuccessMessage("Enquiry Saved successfully");
    }, (error: any) => {
      this.alertService.showSuccessMessage("Failed to save");
    });
  }


  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = <RequestSelectListModel>result.Value.ResponseData;
        },
        (error: any) => (this.errorMessage = <any>error)
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
        { ColumnField: "Date", ColumnHeader: "Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "State", ColumnHeader: "State", Type: "text" },
        { ColumnField: "Status", ColumnHeader: "Deal Status", Type: "text" },
        { ColumnField: "Comment", ColumnHeader: "Comment", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "EmployeeName", ColumnHeader: "Employee Name", Type: "text" },
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
