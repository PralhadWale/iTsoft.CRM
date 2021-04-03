import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgForm } from '@angular/forms/';
import { Router } from '@angular/router';

import { ClientMaster } from '../client.model';
import { RequestType } from 'src/app/_models/requesttype';
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';

import { AlertService, StorageService } from 'src/app/_services';
import { ClientService } from '../client.service';
import { UserProfilService } from 'src/app/_services/userProfile.Service';
import { ClientType } from 'src/app/_models/clientType';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {
  @ViewChild("searchClientNav") searchNav: MatSidenav;
  @ViewChild("clientForm") clientForm: NgForm;
  pageTitle: string = "Client List"
  storageKey = "CLIENTFILTER";
  clientList: Array<any>;
  clientTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  clientMaster: ClientMaster = null;

  clientTypes: Array<string> = ['Assigned', 'Un-Assigned', 'All'];
  selectedClientType: string = "Assigned";
  constructor(
     private clientService: ClientService,
     private storageService: StorageService,
     public userProfileService : UserProfilService,
     private alertService: AlertService,
     private router: Router,
     ) {

  }

  ngOnInit(): void {
    this.SetFilter(false);
    this.SetTableSchema();
    this.Search(this.clientMaster);
  }

  onCommandClick($event: CommandEventArgs) {
    let rowData: ClientMaster = Object.assign({}, $event.rowData);
    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.router.navigate(['/clients/edit/', rowData.ClientId]);
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'addQuotation')
      {

        this.router.navigate(['/quotations/edit/', 0,rowData.ClientId , RequestType.Quotation]);
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'addEnquiry')
      {

        this.router.navigate(['/enquiries/edit/', 0,rowData.ClientId,RequestType.Enquiry]);
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Search) {
        // this.reset();
        this.searchNav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.SetFilter(true);
        this.searchClient(this.clientMaster);
      }
      else if ($event.toolbarItem == ToolBarItems.Add) {
        this.router.navigate(['/clients/edit/', 0]);
      }

    }

  }

  searchClient(clientMaster: ClientMaster) {
    if (this.clientForm && this.clientForm.valid) {
      if (clientMaster) {
        this.Search(clientMaster);
      }
    }
  }


  private SetFilter(resetToDefault: boolean = false) {
    if (resetToDefault) {
      this.clientMaster = this.clientService.NewClient();
      this.clientMaster.ClientTypeId = ClientType.NonCorporate.toString();
    }
    else {
      let filter = this.storageService.GetItem(this.storageKey);
      if (filter != null) {
        this.clientMaster = filter;
      }
      else {
        this.clientMaster = this.clientService.NewClient();
        this.clientMaster.ClientTypeId = ClientType.NonCorporate.toString();
      }
    }

    if (this.searchNav != null) {
      this.searchNav.close();
    }
  }

  Cancel()
  {
    this.searchNav.close();
  }


  Search(clientMaster: ClientMaster) {
    this.clientList = [];
    if (this.selectedClientType == "Assigned") {
      clientMaster.IsAssigned = true;
    }
    else if (this.selectedClientType == "Un-Assigned") {
      clientMaster.IsAssigned = false;
    }
    else {
      clientMaster.IsAssigned = null;
    }

    clientMaster.AdvisorId = this.userProfileService.CurrentUser.UserId;
    this.storageService.SetItem(this.storageKey, this.clientMaster);
    this.clientService.SearchClient(clientMaster).subscribe(result => {
      this.clientList = result.Value.ResponseData;
      this.searchNav.close();
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;


    
    let commands :Array<CommandModel> = [];


    if (this.userProfileService.IsAdmin) {
      this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Search, ToolBarItems.Refresh];
      commands = [
        { commandType: CommandType.Edit},
        { click: null, commandType: CommandType.Other, icon: 'point_of_sale', content: 'addEnquiry', style: { 'background-color': 'skyblue', 'min-height': '25px', 'margin': '5px' }, customstyle: true, toolTip: 'Add Enquiry' },
        { click: null, commandType: CommandType.Other, icon: 'add_shopping_cart', content: 'addQuotation', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' }, customstyle: true, toolTip: 'Add Quoatation' }]
    }

    else {

      this.tableSettings.ToolBarItems = [ToolBarItems.Search, ToolBarItems.Refresh];
      commands = [
        { click: null, commandType: CommandType.Other, icon: 'point_of_sale', content: 'addEnquiry', style: { 'background-color': 'skyblue', 'min-height': '25px', 'margin': '5px' }, customstyle: true, toolTip: 'Add Enquiry' },
        { click: null, commandType: CommandType.Other, icon: 'add_shopping_cart', content: 'addQuotation', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' }, customstyle: true, toolTip: 'Add Quoatation' }]
    }

    

    this.clientTableSchema =
      [
        { ColumnField: "ClientTypeName", ColumnHeader: "Client Type", Type: "text" },
        { ColumnField: "ClientName", ColumnHeader: "Client Name", Type: "text" },
        { ColumnField: "Email", ColumnHeader: "Email", Type: "text" },
        { ColumnField: "PhoneNo1", ColumnHeader: "Phone No", Type: "text" },
        { ColumnField: "PANNO", ColumnHeader: "PAN", Type: "text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "Address", ColumnHeader: "Adress", Type: "text" },
        { ColumnField: "State", ColumnHeader: "State", Type: "text" },
        { ColumnField: "Country", ColumnHeader: "Country", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command : commands }];
  }
}
