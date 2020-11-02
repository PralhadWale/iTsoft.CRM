import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';

import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import { RequestSerchParameters } from '../_models/Requestserchparameters';
import { RequestType } from '../_models/requesttype';
import { RequestDetails } from '../_models/requestdetails';
import { RequestSelectListModel } from '../_models/requestselectlistmodel';

import { RequestService } from '../process/services/request.service';
import { ListService } from '../process/services/list.service';
import { AlertService } from '../_services';

@Component({
  selector: 'quotation-list',
  templateUrl: './quotation-list.component.html',
  styleUrls: ['./quotation-list.component.css'],
  providers: [ConfirmDialog]
})
export class QuotationListComponent implements OnInit {
  @ViewChild("sidenav") sidenav: MatSidenav;

  pageTitle: string = 'Quotations';

  searchFilter: RequestSerchParameters = new RequestSerchParameters(RequestType.Quotation);



  quotationList: Array<any>;
  quotationTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  requestSelectList: RequestSelectListModel = new RequestSelectListModel();

  constructor(
    private requestService: RequestService,
    private listService: ListService,
    private alertService: AlertService,
    private router: Router,

  ) {

  }
  ngOnInit(): void {
    this.LoadSelectListData();
    this.SetTableSchema();
    this.getQuotations();
  }



  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        let rowData: RequestDetails = Object.assign({}, $event.rowData);
        this.router.navigate(['/quotations/edit/', rowData.RequestId]);
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/quotations/edit/', 0]);
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.getQuotations();
      }
    }

  }

  resetSearchFilter(sidenav: any) {
    this.sidenav.toggle();
  }

  searchQuotations(searchFilter: any) {
   this.getQuotations();
  }

  LoadSelectListData() {
    this.listService
      .GetRequestSelectList()
      .subscribe(
        (result) => {
          this.requestSelectList = <RequestSelectListModel>result.Value.ResponseData;

        },

      );
  }

  getQuotations() {

    this.requestService.Search(this.searchFilter).subscribe(result => {
      this.quotationList = result.Value.ResponseData;
      this.sidenav.close();
    }, error => { this.alertService.showErrorMessage(error.error) });

  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh, ToolBarItems.Search];

    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.Edit }
    ];

    this.quotationTableSchema =
      [
        { ColumnField: "RequestNo", ColumnHeader: "Quotation No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Quotation Date", Type: "date" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "Title", ColumnHeader: "Title", Type: "text" },
        { ColumnField: "CompanyName", ColumnHeader: "Company Name", Type: "text" },
        { ColumnField: "LeadSourceName", ColumnHeader: "Source", Type: "text" },
        { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: gridCommands }
      ];
  }
}
