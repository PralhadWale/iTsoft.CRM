import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { ClientService } from '../client.service';
import { ClientMaster } from '../client.model';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {
  @ViewChild("addClient") addClient: AddClientComponent;
  @ViewChild("searchClientNav") searchNav: MatSidenav;
  pageTitle: string = "Client List"

  clientList: Array<any>;
  clientTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  clientMaster: ClientMaster = null;

  clientTypes: Array<string> = ['Assigned', 'Un-Assigned', 'All'];
  selectedClientType: string = "Assigned";
  constructor(private clientService: ClientService, private alertService: AlertService) {

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
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Search) {
        this.reset();
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
    if (clientMaster) {
      this.Search(clientMaster);
    }
  }

  reset() {
    this.clientMaster = this.clientService.NewClient();
    if (this.searchNav != null) {
      this.searchNav.close();
    }
  }


  Search(clientMaster: ClientMaster) {
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
        { ColumnField: "FirstName", ColumnHeader: "First Name", Type: "text" },
        { ColumnField: "MiddleName", ColumnHeader: "Middle Name", Type: "text" },
        { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
        { ColumnField: "Email", ColumnHeader: "Email", Type: "text" },
        { ColumnField: "MobileNo", ColumnHeader: "Mobile No", Type: "text" },
        { ColumnField: "AlternateMobileNo", ColumnHeader: "Alternate Mobile", Type: "text" },
        { ColumnField: "CorporateName", ColumnHeader: "Corporate Name", Type: "text" },
        { ColumnField: "DepartmentName", ColumnHeader: "Department Name", Type: "text" },
        { ColumnField: "Amount", ColumnHeader: "Amount", Type: "text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
      ];
  }
}
