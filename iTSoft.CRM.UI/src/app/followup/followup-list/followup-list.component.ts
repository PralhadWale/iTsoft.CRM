import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddFollowupComponent } from 'src/app/process/add-followup/add-followup.component';
import { AssignFollowUpAvisorComponent } from 'src/app/process/assign-followup-advisor/assign-followup-advisor.component';
import { FollowupService } from 'src/app/process/services/followup.service';
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { FollowUpDetails } from 'src/app/_models/followupdetails';
import { FollowUpSerchParameters } from 'src/app/_models/followupserchparameters';
import { RequestType } from 'src/app/_models/requesttype';

@Component({
  selector: 'app-followup-list',
  templateUrl: './followup-list.component.html',
  styleUrls: ['./followup-list.component.scss']
})
export class FollowupListComponent implements OnInit {
  pageTitle: "Followup List"
  @ViewChild("addFollowUp") addFollowUp: AddFollowupComponent;
  @ViewChild("assignAdvisor") assignAdvisor :AssignFollowUpAvisorComponent;
  @ViewChild("searchBar") searchBar : MatSidenav;
  followUpList: Array<any>;
  followUpTableSchema: Array<TableColumnModel> = [];
  tableSettings: TableDefaultSettings;
   followUpDetails : FollowUpDetails  = new FollowUpDetails();

  followUpSearchParam : FollowUpSerchParameters = new FollowUpSerchParameters();

  constructor(private followUpService : FollowupService,   private router : Router) { 

  }

  ngOnInit(): void {
    this.SetTableSchema();
    this.getFollowUp();
  }

  
  onCommandClick($event: CommandEventArgs) {

    if (!$event.toolbarItem) {
      let rowData: FollowUpDetails = Object.assign({}, $event.rowData);
      if($event.command.commandType == CommandType.Other && $event.command.content == 'add')
      {
        this.addFollowUp.requestType = rowData.RequestTypeId;
        this.addFollowUp.requestId = rowData.RequestId;
        this.addFollowUp.requestNo = rowData.RequestNo;
        this.addFollowUp.SetFollowUpDefaultData();
        this.addFollowUp.sidenav.open();
      }
      else if($event.command.commandType == CommandType.Other  && $event.command.content == 'transfer')
      {
        this.followUpDetails = rowData;
        this.assignAdvisor.sidenav.open();
        
      }

      else if ($event.command.commandType == CommandType.Edit) {
        this.addFollowUp.followUpDetails = rowData;
        this.addFollowUp.SetFollowUpDefaultData();
        this.addFollowUp.sidenav.open();
      }
      else if ($event.command.commandType == CommandType.View) {
        if (rowData.RequestTypeId == RequestType.Enquiry) {
          this.router.navigate(['/enquiries/edit/', rowData.RequestId]);
        }
        else {
          this.router.navigate(['/quotations/edit/', rowData.RequestId]);
        }
      }
    }
    else {
      if ($event.toolbarItem == ToolBarItems.Add) {
        this.addFollowUp.sidenav.toggle(); 
      }
      else if ($event.toolbarItem == ToolBarItems.Search) {
          this.searchBar.open();
      }
      else if ($event.toolbarItem == ToolBarItems.Refresh) {
           this.getFollowUp();
      }
    }

  }

  onAssigned()
  {
    this.getFollowUp();
  }

  searchFollowUps(followUpSearchParam:FollowUpSerchParameters)
  {
      this.getFollowUp();
  }

  resetSearchFilter()
  {
    this.followUpSearchParam = new FollowUpSerchParameters();
    this.searchBar.close();
  }

  onFollowUpSaved() {
       this.getFollowUp();
  }
  
  getFollowUp() {
    this.followUpService.Search(this.followUpSearchParam).subscribe(result => {
      this.followUpList = result.Value.ResponseData;
      this.searchBar.close();
    }, error => { console.log(error); });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems =[ ToolBarItems.Search , ToolBarItems.Refresh]
    
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.View },
      { commandType: CommandType.Edit },
      { click: null, commandType: CommandType.Other, icon: 'queue', content: 'add', style: { 'background-color': 'green', 'min-height': '30px', 'margin': '5px' } , customstyle : true },
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '30px', 'margin': '5px' } , customstyle : true }
    ];
    
    this.followUpTableSchema =
      [
        { ColumnField: "RequestTypeName", ColumnHeader: "Request Type", Type: "text" },
        { ColumnField: "RequestNo", ColumnHeader: "Request No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Request Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Deal Status", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Employee Name", Type: "text" },
        { ColumnField: "Attempt", ColumnHeader: "Attempt", Type: "text" },
        { ColumnField: "ClientRating", ColumnHeader: "Client Rating", Type: "text" },
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command:gridCommands }
      ];


   
  }


}
