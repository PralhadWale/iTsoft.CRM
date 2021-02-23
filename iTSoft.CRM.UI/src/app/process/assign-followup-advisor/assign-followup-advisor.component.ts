import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { FollowUpDetails } from 'src/app/_models/followupdetails';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestSelectListModel } from 'src/app/_models/requestselectlistmodel';
import { AlertService } from 'src/app/_services';
import { FollowupService } from '../services/followup.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-assign-followup-advisor',
  templateUrl: './assign-followup-advisor.component.html',
  styleUrls: ['./assign-followup-advisor.component.scss']
})
export class AssignFollowUpAvisorComponent implements OnInit {
  @ViewChild("assignsidenav") sidenav: MatSidenav;

  @Input() followUpDetails: FollowUpDetails;
  @Input() multipleFollowUpDetails : Array<FollowUpDetails>;
  @Output() onAssigned = new EventEmitter();

  errorMessage: any;
  requestSelectList: RequestSelectListModel;
  requestTypeName: string;

  constructor(
    private followUpService: FollowupService,
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
    if(changes.followUpDetails)
    {
      this.followUpDetails = changes.followUpDetails.currentValue;
    }

    if(changes.multipleFollowUpDetails)
    {
      this.multipleFollowUpDetails = changes.multipleFollowUpDetails.currentValue;
    }

  }

  public SetRequestDefaultData() {
    if (this.followUpDetails == null) {
      this.followUpDetails = new FollowUpDetails();
    }
    
    this.multipleFollowUpDetails =[];
    

  }

  clearData() {
    this.followUpDetails = new FollowUpDetails();
    this.multipleFollowUpDetails =[];
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

 

  onSubmit() 
  {
    if(this.followUpDetails.AdvisorId!= null && this.followUpDetails.AdvisorId > 0)
    {
      if(this.multipleFollowUpDetails.length > 0)
      {
        this.multipleFollowUpDetails.forEach(item => 
        { 
            item.AdvisorId = this.followUpDetails.AdvisorId ; 
            item.TransferWithRequest = this.followUpDetails.TransferWithRequest
        });
      }
      else 
      {
        this.multipleFollowUpDetails.push(this.followUpDetails);
      }

      this.followUpService.Assign(this.multipleFollowUpDetails).subscribe(
        (result)=>
        {
          this.clearData();
          this.alertService.showSuccessMessage("Follow up assigned successfully");
          this.onAssigned.emit();
          this.sidenav.close();
          
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
