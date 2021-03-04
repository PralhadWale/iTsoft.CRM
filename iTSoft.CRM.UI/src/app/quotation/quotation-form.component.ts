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
    NgForm
  } from "@angular/forms";
  import { ActivatedRoute, Router } from "@angular/router";
  
  import { Observable } from "rxjs/Observable";
  import { Subscription } from "rxjs/Subscription";
  import {  BreakpointObserver } from '@angular/cdk/layout';
  
  import { CommandEventArgs,  ITMatTableComponent,  TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
  
  import { RequestViewModel } from '../_models/requestviewmodel';
  import { RequestSelectListModel } from '../_models/requestselectlistmodel';
  import { RequestType } from '../_models/requesttype';
  
  import { RequestService } from '../process/services/request.service';
  import { AlertService } from '../_services';
  import { ListService } from '../process/services/list.service';
  
  import { AddFollowupComponent } from '../process/add-followup/add-followup.component';
  
  import { NumberValidators } from "../shared/number.validator";
  import { GenericValidator } from "../shared/generic-validator";
import { ConfirmDialog } from "../shared/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddServiceComponent } from "../process/add-service/add-service.component";
import { RequestServiceDetails } from "../_models/requestservice";

@Component({
    selector: 'quotation-form',
    templateUrl: './quotation-form.component.html',
    styles: [`
    .title-spacer {
        flex: 1 1 auto;
      }
    .form-field{
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
    .avatar-field {
        left: 0;
        margin: 0 auto;
        position: absolute;
        margin-left: 50px;
    }
    `]
})
export class QuotationFormComponent implements OnInit {
    @ViewChildren("quotationForm") quotationForm: FormGroup;
    @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
    @ViewChild("serviceTable") serviceTable : ITMatTableComponent;
    pageTitle: string = 'Update Quotation';
    errorMessage: string;
    request: RequestViewModel;
    requestTypeId = RequestType.Quotation;
    fieldColspan: number = 4;
    
    followUpTableSchema: Array<TableColumnModel> = [];
    serviceTableSchema: Array<TableColumnModel> = [];

    followupTableSettings: TableDefaultSettings;
    serviceTableSettings: TableDefaultSettings;

    requestSelectList: RequestSelectListModel = new RequestSelectListModel();
    minDate : Date = new Date(2020,1,1);
    maxDate : Date = new Date();

    selectedIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private requestService: RequestService,
        private listService: ListService,
        private alertService: AlertService,
        private dialog : MatDialog,
        private breakpointObserver: BreakpointObserver
    ) {
        this.SetTableSchema();
        this.LoadSelectListData();
        this.SetDefaultRequest();
       

    }

    ngOnInit(): void {

    }

    
  Close(employeeForm:NgForm)
  {
      if (employeeForm.touched) {

          let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to cancel editing ? " };
          const dialogRef = this.dialog.open(ConfirmDialog, {
              maxWidth: "400px",
              data: dialogData
          });

          dialogRef.afterClosed().subscribe(dialogResult => {
              let result = dialogResult;
              if (result == "CONFIRMED") {
                  this.router.navigate(['/quotations']);
              }
          }
          );
      }
      else 
      {
          this.router.navigate(['/quotations']);
      }
  }


    LoadSelectListData() {
        this.listService
            .GetRequestSelectList()
            .subscribe(
                (result) => {
                    this.requestSelectList = <RequestSelectListModel>result.Value.ResponseData;
                },
                (error: any) => (this.errorMessage = <any>error), () => {
                    // Read the quotation Id from the route parameter
                    this.route.params.subscribe(
                        params => {
                            let id = +params['id'];
                            this.getRequest(id);
                        }
                    );
                }
            );
    }

    SetTableSchema() {

        this.followupTableSettings = new TableDefaultSettings();
        this.followupTableSettings.ShowToolBar = true;
        this.followupTableSettings.ToolBarItems = [ToolBarItems.Add];
        this.followupTableSettings.HideFilter = true;


        this.serviceTableSettings = new TableDefaultSettings();
        this.serviceTableSettings.ShowToolBar = true;
        this.serviceTableSettings.ToolBarItems = [ToolBarItems.Add];
        this.serviceTableSettings.HideFilter = true;


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

            this.serviceTableSchema =
            [
              { ColumnField: "ServiceName", ColumnHeader: "Service Name", Type: "text" },
              { ColumnField: "QuoatedPrice", ColumnHeader: "Quoated Price", Type: "text" },
              { ColumnField: "AgreedPrice", ColumnHeader: "Agreed Price", Type: "text" },
              { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
              { ColumnField: "$$edit", ColumnHeader: "", Type: "text" }
            ];
      
    }

    getRequest(requestId: number): void {
        if (requestId > 0) {
            this.requestService
                .Load(requestId)
                .subscribe(
                    (result) => {
                        var data = <RequestViewModel>result.Value.ResponseData;
                        this.onQuotationRetrieved(data)
                    },
                    (error: any) => (this.errorMessage = <any>error)
                );
        }
        else {
            this.requestService.GetNextrequestNumber(this.requestTypeId).subscribe((result)=>{
                var data = result.Value.ResponseData;
                this.request.RequestMaster.RequestNo = data;
                this.onQuotationRetrieved(this.request);
              },  (error: any) => (this.errorMessage = <any>error));
           
        }
    }


    onQuotationRetrieved(request: RequestViewModel): void {
        this.request = request;
        if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
            this.pageTitle = "Add Quotation";
        } else {
            this.pageTitle = `Update Quotation: ${this.request.RequestMaster.RequestNo} `;
        }
    }

    onFollowUpCommandClick($event: CommandEventArgs) {
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

    
  onServiceCommandClick($event: CommandEventArgs) {
    if ($event.toolbarItem) {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.OpenServiceDialog(null);
      }
    }
  }
  OpenServiceDialog(serviceDetails: RequestServiceDetails) {
    const dialogRef = this.dialog.open(AddServiceComponent, {
      data: { ServiceDetails : serviceDetails , AllServiceList : this.request.RequestServiceDetails , ShowPrice:true},
      disableClose: true
    });

    dialogRef.beforeClosed().subscribe(dialogResult => {
      let result = dialogResult;
        if (result && result.Action == "SAVE") {
            if (this.request.RequestServiceDetails == null) {
                this.request.RequestServiceDetails = [];
            }
            if (serviceDetails == null) {
                this.request.RequestServiceDetails.push(result.Data);
            }
            this.serviceTable.RefreshDataSource();

        }
        else {

        }
    }
    );
  }


    onSubmit(quotationForm: NgForm) {
        if (quotationForm && quotationForm.valid) {
            this.request.RequestMaster.RequestTypeId = RequestType.Quotation;
            this.requestService.Save(this.request).subscribe(result => {
                {
                    this.alertService.showSuccessMessage("Quotation Saved successfully");
                    this.SetDefaultRequest();
                    //this.quotationForm.reset();
                    this.router.navigate(['/quotations']);
                }
            }, (error: any) => {
                { this.alertService.showSuccessMessage("Failed to save"); }
            });
        }
    }

    SetDefaultRequest() {
        this.request = new RequestViewModel();
    }


    onScreensizeChange(result: any) {
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
