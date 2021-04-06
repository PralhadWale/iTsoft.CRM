import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms/';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentMaster } from 'src/app/masters/department/department.model';
import { ServiceMaster } from 'src/app/masters/service/service.model';
import { UserService } from 'src/app/shared/services/UserService';
import { LeadStage } from 'src/app/_models/leadStage';
import { LeadStatus } from 'src/app/_models/leadStatus';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestServiceDetails } from 'src/app/_models/requestservice';
import { RequestType } from 'src/app/_models/requesttype';
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
  fieldColspan = 4;

  departmentList: Array<ListModel> = [];
  serviceList: Array<ServiceMaster> = [];

  isNew: boolean = true;
  fromQuotation: boolean = false;
  isCorporate: boolean = true;
  requestTypeId: number = RequestType.Enquiry;


  enqMinDate: Date = new Date();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddServiceComponent>,
    public listService: ListService,
    private userService: UserProfilService,
    private alertService: AlertService,
    private changeDetector: ChangeDetectorRef

  ) {

    this.requestServiceDetails = new RequestServiceDetails();
    this.requestAllServiceList = [];
    this.pageTitle = "Add Service";

    if (data) {

      this.requestTypeId = data.requestTypeId;

      if (data.ServiceDetails != null) {
       // this.requestServiceDetails = data.ServiceDetails;
        let keys = Object.keys(data.ServiceDetails);
        keys.forEach((key) => {
          if (!key.startsWith('__proto__')) {
            this.requestServiceDetails[key] = data.ServiceDetails[key]
          }
        });
        this.isNew = false;
      }

      if (data.AllServiceList != null) {
        this.requestAllServiceList = data.AllServiceList;
      }

      this.fromQuotation = data.ShowPrice
      this.isCorporate = data.ShowNumberOfEmployees;

    }

    if (!this.isNew) {
       //this.requestServiceDetails.Reset();
       //this.requestServiceDetails.Calculate(this.fromQuotation);
    }

    if (!this.isCorporate) {
      this.requestServiceDetails.NoOfEmployees = 1;
      this.requestServiceDetails.Quantity = 1;
    }

  }

  ngOnInit(): void {

    this.SetDefaultData();
  }

  ngAfterViewChecked() { this.changeDetector.detectChanges(); }


  SetDefaultData() {
    if (this.requestServiceDetails.RequestServiceId && this.requestServiceDetails.RequestServiceId > 0) {
      this.pageTitle = "Update service";
    }
    else {
      this.pageTitle = "Add service";

      this.requestServiceDetails.LeadStatusId = LeadStatus.NotAttended;
      this.requestServiceDetails.StageId = LeadStage.Warm;
      this.listService.GetActiveDepartments().subscribe((result) => {
        this.departmentList = result.Value.ResponseData;
        if (this.requestServiceDetails.RequestServiceId > 0) {
          this.GetDepartmentServices(this.requestServiceDetails.DepartmentId);
        }
      }, error => {
        this.alertService.showErrorMessage(error.error);
      });

    }

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

    this.requestServiceDetails.Reset();

    if ($event != null) {
      let serviceId = $event.value;
      let service: ServiceMaster = this.serviceList.filter(f => f.ServiceId == serviceId)[0];
      this.requestServiceDetails.ServiceName = service.ServiceName;
      this.requestServiceDetails.ServiceId = service.ServiceId;
      this.requestServiceDetails.ServiceQuotedPrice = service.Price;
    }
    else {
      this.requestServiceDetails.ServiceName = null;
      this.requestServiceDetails.ServiceId = null;
    }


  }

  calculatePrice() {
    this.requestServiceDetails.Calculate(this.fromQuotation);

  }

  saveService(serviceForm: NgForm) {
    if (serviceForm && serviceForm.valid && this.requestServiceDetails.ServiceId > 0) {

      if ((this.isNew && this.requestAllServiceList.filter(x => x.ServiceId == this.requestServiceDetails.ServiceId && x.FinancialYearId == this.requestServiceDetails.FinancialYearId).length > 0) ||
        (!this.isNew && this.requestAllServiceList.filter(x => x.ServiceId == this.requestServiceDetails.ServiceId && x.FinancialYearId == this.requestServiceDetails.FinancialYearId && x.RequestServiceId != this.requestServiceDetails.RequestServiceId).length > 0)) {
        this.alertService.showErrorMessage("Service alreary present in list");
      }
      else {

        this.requestServiceDetails.LeadStatusName = this.listService.GetLeadStatusName(this.requestServiceDetails.LeadStatusId);
        this.requestServiceDetails.StageName = this.listService.GetStageName(this.requestServiceDetails.StageId);
        this.requestServiceDetails.LeadSourceName = this.listService.GetSourceName(this.requestServiceDetails.SourceId);
        this.requestServiceDetails.FinancialYear = this.listService.GetFinancialYear(this.requestServiceDetails.FinancialYearId);

        this.requestServiceDetails.Calculate(this.fromQuotation);

        this.dialogRef.close({ Action: this.ACTION_SAVE, Data: this.requestServiceDetails });
      }
    }
  }

  closeDialog(serviceForm: NgForm) {
    this.dialogRef.close({ Action: this.ACTION_CANCEL });
  }


}
