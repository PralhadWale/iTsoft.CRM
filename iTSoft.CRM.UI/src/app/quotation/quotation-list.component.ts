import { Component, OnInit, ViewChild } from '@angular/core';

import { Quotation } from './quotation';
import { QuotationService } from './quotation.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';

import {MatDialog} from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { RequestService } from '../process/services/request.service';
import { Router } from '@angular/router';
import { RequestType } from '../_models/requesttype';
import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { MatSidenav } from '@angular/material/sidenav';
import { RequestDetails } from '../_models/requestdetails';


@Component({
    selector: 'quotation-list',
    templateUrl: './quotation-list.component.html',
    styleUrls: ['./quotation-list.component.css'],
    providers: [ConfirmDialog]
})
export class QuotationListComponent implements OnInit {
   @ViewChild("sidenav")  sidenav : MatSidenav;

    pageTitle: string = 'Quotations';
   
    searchFilter: any = {
        Phone: "",
        Name: "",
        CompanyName: "",
        QuotationNo: ""
    };
   

    quotationList: Array<any>;
    quotationTableSchema: Array<TableColumnModel> = [];
    tableSettings: TableDefaultSettings;
   
    constructor(
        private requestService: RequestService,
        private router : Router,
    
      ) {
    
      }
      ngOnInit(): void {
        this.SetTableSchema();
        this.getEnquiries();
      }
      
   

      onCommandClick($event: CommandEventArgs) {
   
        if (!$event.toolbarItem) {
          if ($event.command.commandType == CommandType.Edit) {
            let rowData: RequestDetails = Object.assign({}, $event.rowData);
            this.router.navigate(['/quotations/edit/', rowData.RequestId]);
          }
          else if ($event.command.commandType == CommandType.Delete) {
    
          }
          else if ($event.command.commandType == CommandType.View) {
    
          }
        }
        else {
          if ($event.toolbarItem == ToolBarItems.Add) {
            this.router.navigate(['/quotations/edit/', 0]);
          }
          else if ($event.toolbarItem == ToolBarItems.Search) {
            this.sidenav.toggle();
          }
          else if ($event.toolbarItem == ToolBarItems.Refresh) {
            
          }
        }
    
      }
    
      resetSearchFilter(sidenav:any)
      {
        this.sidenav.toggle();
      }
    
      searchQuotations(searchFilter:any)
      {
        this.sidenav.toggle();
      }
    
      getEnquiries() {
    
        let filter = new RequestSerchParameters();
        filter.RequestTypeId = <number>RequestType.Quotation;
        filter.FromDate = new Date(2020, 10, 1);
        filter.ToDate = new Date(2021, 10, 1);
        this.requestService.Search(filter).subscribe(result => {
          this.quotationList = result.Value.ResponseData;
    
        }, error => { console.log(error); });
    
      }
    
      SetTableSchema() {
        this.tableSettings = new TableDefaultSettings();
        this.tableSettings.ShowToolBar = true;
        this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh , ToolBarItems.Search];
        
        let gridCommands: Array<CommandModel> = [
          { commandType: CommandType.Edit}
        ];
    
        this.quotationTableSchema =
          [
            { ColumnField: "RequestNo", ColumnHeader: "Quotation No", Type: "text" },
            { ColumnField: "RequestDate", ColumnHeader: "Quotation Date", Type: "date" },
            { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
            { ColumnField: "Title", ColumnHeader: "Title", Type: "text" },
            { ColumnField: "CustomerName", ColumnHeader: "CustomerName", Type: "text" },
            { ColumnField: "LeadSourceName", ColumnHeader: "Source", Type: "text" },
            { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
            { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command : gridCommands }
          ];
    
    
      
      }
    
   



}
