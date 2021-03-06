import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceMaster } from 'src/app/masters/service/service.model';
import { UserService } from 'src/app/shared/services/UserService';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestServiceDetails } from 'src/app/_models/requestservice';
import { AlertService } from 'src/app/_services';
import { UserProfilService } from 'src/app/_services/userProfile.Service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  @ViewChild("serviceForm") serviceForm: NgForm;

  public readonly ACTION_SAVE: string = "SAVE";
  public readonly ACTION_CANCEL: string = "CANCEL";
  pageTitle: string = "Update service";

  public requestAllServiceList: Array<RequestServiceDetails>;
  public requestServiceDetails: RequestServiceDetails;
  fieldColspan = 6;

  departmentList: Array<ListModel> = [];
  serviceList: Array<ServiceMaster> = [];
  isNew: boolean = true;
  showPrice: boolean = false
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddServiceComponent>,
    private listService: ListService,
    private userService: UserProfilService,
    private alertService: AlertService

  ) {

    this.requestServiceDetails = new RequestServiceDetails();
    this.requestAllServiceList = [];
    this.pageTitle = "Add Service";

    if (data) {

      if (data.ServiceDetails != null) {
        this.requestServiceDetails = data.ServiceDetails;
        this.isNew = false;
      }

      if (data.AllServiceList != null) {
        this.requestAllServiceList = data.AllServiceList;
      }
      this.showPrice = data.ShowPrice

    }


  }

  ngOnInit(): void {

    this.SetDefaultData();
  }

  SetDefaultData() {
    if (this.requestServiceDetails.RequestServiceId && this.requestServiceDetails.RequestServiceId > 0) {
      this.pageTitle = "Update service";
    }
    else {
      this.pageTitle = "Add service";
    }

    this.userService.CurrentUserDepartments.subscribe((result : Array<ListModel>) => {
      this.departmentList = result;
      if(this.requestServiceDetails.RequestServiceId > 0)
      {
          this.GetDepartmentServices(this.requestServiceDetails.DepartmentId);
      }
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });

  }

  onDepartmentChanged($event: any) {
    if ($event != null) {
      let departmentId = $event.value;
      this.requestServiceDetails.ServiceId = null;
      this.GetDepartmentServices(departmentId);
    }

  }

  private GetDepartmentServices(departmentId: number) {
    let data: ListModel = this.departmentList.filter(f => f.Value == departmentId)[0];
    this.requestServiceDetails.DepartmentName = data.Text;

    this.serviceList = [];

    this.listService.GetDepartmentServices(departmentId).subscribe(result => {
      this.serviceList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  onServiceChanged($event: any) {
    if ($event != null) {
      let serviceId = $event.value;
      let service: ServiceMaster = this.serviceList.filter(f => f.ServiceId == serviceId)[0];
      this.requestServiceDetails.ServiceName = service.ServiceName;
      this.requestServiceDetails.ServiceId = service.ServiceId;
      this.requestServiceDetails.QuoatedPrice = service.Price;
    }
    else {
      this.requestServiceDetails.ServiceName = null;
      this.requestServiceDetails.ServiceId = null;
      this.requestServiceDetails.QuoatedPrice = null;
    }
  }

  saveService(serviceForm: NgForm) {
    if (serviceForm && serviceForm.valid && this.requestServiceDetails.ServiceId > 0) {

      if ((this.isNew && this.requestAllServiceList.filter(x => x.ServiceId == this.requestServiceDetails.ServiceId).length > 0) ||
        (!this.isNew && this.requestAllServiceList.filter(x => x.ServiceId == this.requestServiceDetails.ServiceId && x.RequestServiceId != this.requestServiceDetails.RequestServiceId).length > 0)) {
        this.alertService.showErrorMessage("Service alreary present in list");
      }
      else {
        this.dialogRef.close({ Action: this.ACTION_SAVE, Data: this.requestServiceDetails });
      }
    }
  }

  closeDialog(serviceForm: NgForm) {
    this.dialogRef.close({ Action: this.ACTION_CANCEL });
  }


}
