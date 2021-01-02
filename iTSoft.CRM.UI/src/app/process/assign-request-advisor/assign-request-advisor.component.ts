import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestDetails } from 'src/app/_models/requestdetails';
import { RequestSelectListModel } from 'src/app/_models/requestselectlistmodel';
import { AlertService } from 'src/app/_services';
import { ListService } from '../services/list.service';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-assign-request-advisor',
  templateUrl: './assign-request-advisor.component.html',
  styleUrls: ['./assign-request-advisor.component.scss']
})
export class AssignRequestAvisorComponent implements OnInit {
  @ViewChild("assignsidenav") sidenav: MatSidenav;

  @Input() requestDetails: RequestDetails;
  @Output() onAssigned = new EventEmitter();

  errorMessage: any;
  requestSelectList: RequestSelectListModel;
  requestTypeName: string;

  constructor(
    private requestService: RequestService,
    private listService: ListService,
    private alertService: AlertService,
  ) {
    this.requestSelectList = new RequestSelectListModel();
    this.SetRequestDefaultData();
    this.LoadSelectListData();
  }


  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.requestDetails)
    {
      this.requestDetails = changes.requestDetails.currentValue;
    }
    
  }

  public SetRequestDefaultData() {
    if (this.requestDetails == null) {
      this.requestDetails = new RequestDetails();
    }
  }

  clearData() {
    this.requestDetails = new RequestDetails();
  }

  LoadSelectListData() {
    this.listService
      .GetAdvisorSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = new RequestSelectListModel();
          this.requestSelectList.Advisors = <Array<ListModel>>result.Value.ResponseData;
        },
        (error: any) => (this.errorMessage = <any>error)
      );
  }

  onSubmit() {
    if(this.requestDetails.AdvisorId!= null && this.requestDetails.AdvisorId > 0)
    {
      this.requestService.AssignRequest(this.requestDetails).subscribe(
        (result)=>
        {
          this.sidenav.close();
          this.alertService.showSuccessMessage("Request assigned successfully");
          this.onAssigned.emit();
          this.clearData();
        } , (error)=>
        { 
          this.alertService.showErrorMessage(error.error)
        });
    }
    else 
    {
      this.alertService.showErrorMessage("Please select valid advisor");
    }
  }
 
  onCancelClick()
  {
    this.clearData();
    this.sidenav.close();
  }

}
