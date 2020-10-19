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

import { IEnquiry } from "./enquiry";
import { EnquiryService } from "./enquiry.service";
import { NumberValidators } from "../shared/number.validator";
import { GenericValidator } from "../shared/generic-validator";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TableColumnModel } from '../shared/table-layout/it-mat-table.component';

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
  enquiry: IEnquiry = <IEnquiry>{};
  showImage: boolean;
  fieldColspan = 4;
  displayedColumns = ["EnquiryNo","Name", "Email","Phone","CompanyName","EnquiryDate" , "Source","Service","Amount","AlterNateNo", "State", "Website", "Address","EnquiryId"];
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

  followUpList : Array<any>;
  followUpTableSchema : Array<TableColumnModel> = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private enquiryService: EnquiryService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.SetTableSchema();
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.onScreensizeChange();
    });

    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  SetTableSchema() {
    this.followUpTableSchema =
     [
       { ColumnField:"Date" , ColumnHeader:"Date" , Type:"date" },
       { ColumnField:"FollowUpDate" , ColumnHeader:"FollowUp Date" , Type:"date" },
       { ColumnField:"DealStatus" , ColumnHeader:"Deal Status" , Type:"text" },
       { ColumnField:"Comment" , ColumnHeader:"Comment" , Type:"text" },
       { ColumnField:"Remark" , ColumnHeader:"Remark" , Type:"text" },
       { ColumnField:"EmployeeName" , ColumnHeader:"Employee Name" , Type:"text" },
       { ColumnField:"Attempt" , ColumnHeader:"Attempt" , Type:"text" },
       { ColumnField:"ClientRating" , ColumnHeader:"Client Rating" , Type:"text" },
       {ColumnField:"$$edit",ColumnHeader:"",Type:"text"}
     ];


     this.followUpList = [{Date:Date(),FollowUpDate:Date(),DealStatus:"Completed",EmployeeName:"Pralhad",Attempt:1,Comment:"",Remark:"",ClientRating:10}]
  }

  ngOnInit(): void {
    this.enquiryForm = this.fb.group({
      EnquiryId: [""],
      EnquiryNo: [""],
      EnquiryDate:[""],
      Name: ["", [Validators.required]],
      CompanyName:[""],
      Title:[""],
      Email:[""],
      Website:[""],
      Address:[""],
      PinCode:[""],
      Amount: ["", [Validators.required, NumberValidators.range(1, 99999)]],
      AlterNateNo:[""],
      DOB:[""],
      SourceId:[""],
      StateId:[""],
      CityId:[""],
      CliendBaheviourId:[""],
      membership: false
    });

    // Read the enquiry Id from the route parameter
    // this.sub = this.route.params.subscribe(params => {
    //   let id = +params["id"];
    //   this.getEnquiry(id);
    // });

   
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

  getEnquiry(id: number): void {
    this.enquiryService
      .getEnquiry(id)
      .subscribe(
        (enquiry: IEnquiry) => this.onEnquiryRetrieved(enquiry),
        (error: any) => (this.errorMessage = <any>error)
      );
  }

 
  onEnquiryRetrieved(enquiry: IEnquiry): void {
    if (this.enquiryForm) {
      this.enquiryForm.reset();
    }
    this.enquiry = enquiry;

    // if (this.enquiry.id === 0) {
    //   this.pageTitle = "Add Enquiry";
    // } else {
    //   this.pageTitle = `Update Enquiry: ${this.enquiry.reference} `;
    // }

    // // Update the data on the form
    // this.enquiryForm.patchValue({
    //   reference: this.enquiry.reference,
    //   amount: this.enquiry.amount,
    //   enquiryDate: new Date(this.enquiry.enquiryDate),
    //   shippedDate: new Date(this.enquiry.shippedDate),
    //   address: this.enquiry.shipAddress.address,
    //   city: this.enquiry.shipAddress.city,
    //   country: this.enquiry.shipAddress.country,
    //   zipcode: this.enquiry.shipAddress.zipcode,
    //   customerId: this.enquiry.customerId,
    //   membership: this.enquiry.membership
    // });

  }

  saveEnquiry()
  {
    
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
  deleteProduct(): void { }
}
