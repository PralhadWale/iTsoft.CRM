import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Quotation } from './quotation';
import { QuotationService } from './quotation.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { RequestService } from '../process/services/request.service';
import { RequestViewModel } from '../_models/requestviewmodel';
import { ListService } from '../process/services/list.service';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';
import { RequestType } from '../_models/requesttype';
import { AlertService } from '../_services';


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

    pageTitle: string = 'Update Quotation';
    errorMessage: string;
    request: RequestViewModel;

    fieldColspan: number = 4;
    tableSettings: TableDefaultSettings;
    followUpTableSchema: Array<TableColumnModel> = [];
    requestSelectList : RequestSelectListModel = new RequestSelectListModel();
    constructor(
        private route: ActivatedRoute,
        private requestService: RequestService,
        private listService : ListService,
        private alertService : AlertService,
        private breakpointObserver: BreakpointObserver
    ) {
        this.LoadSelectListData();
        this.SetDefaultRequest();
        this.SetTableSchema();

    }

    ngOnInit(): void {
        // Read the quotation Id from the route parameter
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getRequest(id);
            }
        );
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




    getRequest(requestId: number): void {
        if (requestId > 0) {
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
        this.request = request;
        if (this.request.RequestMaster.RequestId == undefined || this.request.RequestMaster.RequestId === 0) {
            this.pageTitle = "Add Quotation";
        } else {
            this.pageTitle = `Update Quotation: ${this.request.RequestMaster.RequestNo} `;
        }
    }



    onSubmit(quotationForm: NgForm) {
        if (quotationForm && quotationForm.valid) {
            this.request.RequestMaster.RequestTypeId = RequestType.Quotation;
            this.requestService.Save(this.request).subscribe(result => {
             { 
                this.alertService.showSuccessMessage("Quotation Saved successfully");
                this.SetDefaultRequest();
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
