import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ResponseCode } from 'src/app/core/models/ServiceResponse.model';
import { FollowUp } from 'src/app/_models/followup';
import { FollowUpDetails } from 'src/app/_models/followupdetails';
import { RequestSelectListModel } from 'src/app/_models/requestselectlistmodel';
import { RequestType } from 'src/app/_models/requesttype';
import { AlertService } from 'src/app/_services';
import { FollowupService } from '../services/followup.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-add-followup',
  templateUrl: './add-followup.component.html',
  styleUrls: ['./add-followup.component.scss']
})
export class AddFollowupComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;
  @Input() requestId: number;
  @Input() requestNo: string;
  @Input() requestType: RequestType;
  @Input() followUpDetails: FollowUpDetails;
  @Output() onFollowUpSaved = new EventEmitter();

  errorMessage: any;
  followUP: FollowUp;
  requestSelectList: RequestSelectListModel;
  requestTypeName: string;
  public IsCompleted: boolean = false;
  minDate = new Date();
  nextMinDate = new Date();
  fieldColspan = 6;
  isCorporate = false;
  fromQuotation : boolean = false;
  constructor(
    private followUpService: FollowupService,
    private listService: ListService,
    private alertService: AlertService,
  ) {

    
    this.nextMinDate.setDate(this.nextMinDate.getDate() + 1);
    this.requestSelectList = new RequestSelectListModel();
    this.SetFollowUpDefaultData();
    this.LoadSelectListData();
  }


  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges) {
    this.SetFollowUpDefaultData();
  }

  public SetFollowUpDefaultData() {
    if (this.followUpDetails == null) {
      this.followUP = new FollowUp();
      this.followUP.RequestId = this.requestId;
      this.followUP.FollowUpDate = new Date();
      this.IsCompleted = false;
    }
    else {
     // this.requestType = this.followUpDetails.RequestTypeId;
      this.requestNo = this.followUpDetails.RequestNo;
      this.followUP = Object.assign({}, this.followUpDetails);
      this.IsCompleted = this.followUpDetails.IsCompleted;

      this.listService.ActiveLeadStatusList(this.followUpDetails.RequestTypeId).subscribe((result) => {
        this.requestSelectList.LeadStatuses = result;
      });

    }

    this.requestTypeName = "Add"

    this.fromQuotation = this.requestType == RequestType.Quotation;
    this.followUP.LeadStatusId = null;
  }

  clearFollowUpData() {
    this.followUpDetails = new FollowUpDetails();
    this.requestNo = '';
    this.requestType = -1;
  }



  LoadSelectListData() {
    this.listService
      .GetFollowupSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = result;
        },
        (error: any) => (this.errorMessage = <any>error)
      );
  }

  onLeadStatusChange($event:any)
  {
    this.fromQuotation =  (this.followUP.LeadStatusId == 10010 || this.followUP.LeadStatusId == 10011 || this.followUP.LeadStatusId == 10012);
    if(this.fromQuotation)
    {
      this.followUP.ServiceAgreedDiscountAmount = this.followUP.ServiceQuotedDicountAmount;
      this.followUP.ServiceAgreedDiscountPercent = this.followUP.ServiceQuotedDiscountPercent;
      this.followUP.ServiceAgreedNetAmount = this.followUP.ServiceQuotedNetAmount;
    }
  }

  calculatePrice()
  {
      
    this.followUP.NoOfEmployees =  this.followUP.NoOfEmployees != null && this.followUP.NoOfEmployees > 0 ? this.followUP.NoOfEmployees : 1;
    this.followUP.Quantity = this.followUP.NoOfEmployees;

    this.followUP.ServiceQuotedDicountAmount = Math.round((this.followUP.ServiceQuotedDiscountPercent / 100) * this.followUP.ServiceQuotedPrice) 
    this.followUP.ServiceQuotedNetAmount = this.followUP.ServiceQuotedPrice - this.followUP.ServiceQuotedDicountAmount;

    this.followUP.ServiceTotalQuotedPrice= this.followUP.ServiceQuotedPrice * this.followUP.Quantity;
    this.followUP.ServiceTotalQuotedDiscountPercent= this.followUP.ServiceTotalQuotedDiscountPercent;
    this.followUP.ServiceTotalQuotedDicountAmount=this.followUP.ServiceQuotedDicountAmount * this.followUP.Quantity;
    this.followUP.ServiceTotalQuotedNetAmount=this.followUP.ServiceQuotedNetAmount * this.followUP.Quantity;

    if (this.fromQuotation) {
       
        this.followUP.ServiceAgreedDiscountAmount = Math.round((this.followUP.ServiceAgreedDiscountPercent / 100) * this.followUP.ServiceQuotedPrice)
        this.followUP.ServiceAgreedNetAmount = this.followUP.ServiceQuotedPrice - this.followUP.ServiceAgreedDiscountAmount;
       
        this.followUP.ServiceTotalAgreedDiscountPercent = this.followUP.ServiceAgreedDiscountPercent;
        this.followUP.ServiceTotalAgreedDiscountAmount = this.followUP.ServiceAgreedDiscountAmount * this.followUP.Quantity;
        this.followUP.ServiceTotalAgreedNetAmount = this.followUP.ServiceAgreedNetAmount * this.followUP.Quantity;
    }
  }

  onSubmit(followUpForm: NgForm) {
    if (followUpForm && followUpForm.valid) {
      if (isNaN(this.followUP.RequestId)) {
        this.alertService.showErrorMessage("Invalid request");
      }
      else {
        this.calculatePrice();
        this.followUpService.Save(this.followUP).subscribe(result => {
          {
            var response = result.Value;
            if (response.ResponseCode == ResponseCode.Success) {
              if (response.ResponseData && response.ResponseData != '') {
                this.alertService.showInfoMessage("Saved successfully. Quotation numbered " + response.ResponseData + " created for converted services",
                  10000);
              }
              else {
                this.alertService.showSuccessMessage("Saved successfully");
              }
              this.sidenav.close();
              this.onFollowUpSaved.emit();
              this.clearFollowUpData();
              
            }
            else {
              this.alertService.showErrorMessage("Failed to save");
            }

          }
        }, (error: any) => {
          { this.alertService.showSuccessMessage("Failed to save"); }
        });
      }
    }
  }

  onCancelClick() {
    this.clearFollowUpData();
    this.sidenav.close();
  }

}
