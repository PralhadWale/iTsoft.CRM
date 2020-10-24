import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
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

  constructor(
    private followUpService: FollowupService,
    private listService: ListService,
    private alertService: AlertService,
  ) {
    this.requestSelectList = new RequestSelectListModel();
    this.SetFollowUpDefaultData();
    this.LoadSelectListData();
  }


  ngOnInit(): void {


  }

  SetFollowUpDefaultData() {
    if (this.followUpDetails == null) {
      this.followUP = new FollowUp();
      this.followUP.RequestId = this.requestId;
      this.followUP.AddedOn = new Date();
    }
    else {
      this.requestType = this.followUpDetails.RequestTypeId;
      this.requestNo = this.followUpDetails.RequestNo;
      this.followUP = Object.assign({}, this.followUpDetails);
    }


   
    this.requestTypeName = this.requestType == RequestType.Enquiry ? "Enquiry" : "Quotation"
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


  onSubmit(followUpForm: NgForm) {
    if (followUpForm && followUpForm.valid) {
      if (isNaN(this.followUP.RequestId)) {
        this.alertService.showErrorMessage("Invalid request");
      }
      this.followUpService.Save(this.followUP).subscribe(result => {
        {
          this.alertService.showSuccessMessage("Quotation Saved successfully");
          this.sidenav.close();
          this.onFollowUpSaved.emit();
        }
      }, (error: any) => {
        { this.alertService.showSuccessMessage("Failed to save"); }
      });
    }
  }


}
