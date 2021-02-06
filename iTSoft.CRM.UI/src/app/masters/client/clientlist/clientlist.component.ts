import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommandEventArgs, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { AlertService } from 'src/app/_services';
import { ClientService } from '../client.service';

import { ClientMaster } from '../client.model';
@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss']
})
export class ClientlistComponent implements OnInit {

  @ViewChild("clientNav") sidenav: MatSidenav;
  pageTitle: string = "Client List"

  clientList: Array<any>;
  clientTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
  clientMaster: ClientMaster = null;

  constructor(private clientService: ClientService, private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.reset();
    this.SetTableSchema();
    this.Search(this.clientMaster);
  }

  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      if ($event.command.commandType == CommandType.Edit) {
        this.clientMaster = Object.assign({}, $event.rowData);
        this.sidenav.open();
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Search) {
        this.reset();
        this.sidenav.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {

      }
    }

  }


  searchClient(clientMaster: ClientMaster) {
    if (clientMaster) {
    this.Search(clientMaster);
    }
  }

  reset() {


    this.clientMaster = this.clientService.NewClient();
    if (this.sidenav != null) {
      this.sidenav.close();
    }


  }

  
  Search(clientMaster:ClientMaster)
  {
    this.clientService.SearchClient(clientMaster).subscribe(result => {
      this.clientList = result.Value.ResponseData;
    }, error => {
      this.alertService.showErrorMessage(error.error);
    });
  }

  SetTableSchema() {
      this.tableSettings = new TableDefaultSettings();
      this.tableSettings.ShowToolBar = true;
      this.tableSettings.ToolBarItems = [ToolBarItems.Search, ToolBarItems.Refresh];
  
      this.clientTableSchema =
        [
          { ColumnField: "ClientName", ColumnHeader: "Client Name", Type: "text" },
          { ColumnField: "FirstName", ColumnHeader: "First Name", Type: "text" },
          { ColumnField: "MiddleName", ColumnHeader: "Middle Name", Type: "text" },
          { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
          { ColumnField: "Email", ColumnHeader: "Email", Type: "text" },
          { ColumnField: "MobileNo", ColumnHeader: "Mobile No", Type: "text" },
          { ColumnField: "AlternateMobileNo" , ColumnHeader : "Alternate Mobile" , Type:"text" },
          { ColumnField: "CorporateName" , ColumnHeader : "Corporate Name" , Type:"text" },
          { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: [{ commandType: CommandType.Edit }] }
        ];
  }
}
