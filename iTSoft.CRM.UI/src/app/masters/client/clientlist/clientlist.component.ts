import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { ClientService } from '../client.service';
import { ClientMaster } from '../client.model';
import { AddClientComponent } from '../add-client/add-client.component';
import { NgForm } from '@angular/forms/';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {
  @ViewChild("addClient") addClient: AddClientComponent;
  @ViewChild("searchClientNav") searchNav: MatSidenav;
  @ViewChild("clientForm") clientForm: NgForm;
  pageTitle: string = "Client List"

  clientList: Array<any>;
  clientTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  clientMaster: ClientMaster = null;

  clientTypes: Array<string> = ['Assigned', 'Un-Assigned', 'All'];
  selectedClientType: string = "Assigned";
  constructor(
    private clientService: ClientService,
     private alertService: AlertService,
     private router: Router,
     ) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.Search(this.clientMaster);
  }

  onCommandClick($event: CommandEventArgs) {
    let rowData: ClientMaster = Object.assign({}, $event.rowData);
    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.addClient.clientMaster = rowData;
        this.addClient.SetClientDefaultData();
        this.addClient.sidenav.open();
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'addQuotation')
      {

        this.router.navigate(['/quotations/edit/', 0,rowData.ClientId]);
      }
      else if($event.command.commandType == CommandType.Other && $event.command.content == 'addEnquiry')
      {

        this.router.navigate(['/enquiries/edit/', 0,rowData.ClientId]);
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Search) {
        // this.reset();
        this.searchNav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
        this.searchClient(this.clientMaster);
      }
      else if ($event.toolbarItem == ToolBarItems.Add) {
        this.addClient.SetClientDefaultData();
        this.addClient.sidenav.open();
      }

    }

  }

  onClientSaved() {
    this.searchClient(this.clientMaster);
  }

  searchClient(clientMaster: ClientMaster) {
    if (this.clientForm && this.clientForm.valid) {
      if (clientMaster) {
        this.Search(clientMaster);
      }
    }
  }

  reset() {
    this.clientMaster = this.clientService.NewClient();
    if (this.searchNav != null) {
      this.searchNav.close();
    }
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
    this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Search, ToolBarItems.Refresh];

    this.clientTableSchema =
      [
        { ColumnField: "ClientName", ColumnHeader: "Client Name", Type: "text" },
        { ColumnField: "DoB", ColumnHeader: "Date of Birth", Type: "text" },
        // { ColumnField: "FirstName", ColumnHeader: "First Name", Type: "text" },
        // { ColumnField: "MiddleName", ColumnHeader: "Middle Name", Type: "text" },
        // { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
        { ColumnField: "Email", ColumnHeader: "Email", Type: "text" },
        { ColumnField: "MobileNo", ColumnHeader: "Mobile No", Type: "text" },
        { ColumnField: "PANNo", ColumnHeader: "PAN", Type: "text" },
        { ColumnField: "CorporateName", ColumnHeader: "Corporate Name", Type: "text" },
        // { ColumnField: "DepartmentName", ColumnHeader: "Department Name", Type: "text" },
        // { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }, 
        { click: null, commandType: CommandType.Other, icon: 'point_of_sale', content: 'addEnquiry', style: { 'background-color': 'skyblue', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip:'Add Enquiry' }, 
        { click: null, commandType: CommandType.Other, icon: 'add_shopping_cart', content: 'addQuotation', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true , toolTip:'Add Quoatation' }] }
      ];
  }
}
