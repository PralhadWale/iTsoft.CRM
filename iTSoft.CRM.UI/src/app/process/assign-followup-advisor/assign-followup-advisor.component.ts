import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class AssignFollowUpAvisorComponent implements OnInit, OnChanges {
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

    if(this.followUpDetails.DepartmentId >0)
    {
      this.GetDepartmentAdvisor(this.followUpDetails.DepartmentId);
    }

    if(this.multipleFollowUpDetails && this.multipleFollowUpDetails.length > 0)
    {
      this.GetDepartmentAdvisor(this.multipleFollowUpDetails[0].DepartmentId);
    }

  }

  public SetRequestDefaultData() {
    if (this.followUpDetails == null) {
      this.followUpDetails = new FollowUpDetails();
    }
    
    this.multipleFollowUpDetails =[];
    
    if(this.followUpDetails.DepartmentId >0)
    {
      this.GetDepartmentAdvisor(this.followUpDetails.DepartmentId);
    }

  }

  clearData() {
    this.followUpDetails = new FollowUpDetails();
    this.multipleFollowUpDetails =[];
    //this.followUpDetails.DepartmentId = null;
    this.followUpDetails.AdvisorId = null;

  }



  LoadSelectListData() {
    this.listService
      .GetActiveDepartments()
      .subscribe(
        (result) => {
          this.requestSelectList = new RequestSelectListModel();
          this.requestSelectList.Departments = <Array<ListModel>>result.Value.ResponseData;
         
        },
        (error: any) => (this.errorMessage = <any>error)
      );
  }

  
  onDepartmentChanged($event: any) {
    if ($event != null) {
      let departmentId = $event.value;
      this.followUpDetails.AdvisorId = null;
      this.GetDepartmentAdvisor(departmentId);
    }

  }
  GetDepartmentAdvisor(departmentId: any) {
    this.listService.GetDepartmentAdvisors(departmentId).subscribe((result) => {
        this.requestSelectList.Advisors = result.Value.ResponseData;
    });
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
