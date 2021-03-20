import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AddFollowupComponent } from 'src/app/process/add-followup/add-followup.component';
import { AssignFollowUpAvisorComponent } from 'src/app/process/assign-followup-advisor/assign-followup-advisor.component';
import { FollowupService } from 'src/app/process/services/followup.service';
import { ListService } from 'src/app/process/services/list.service';
import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from 'src/app/shared/table-layout/it-mat-table.component';
import { ConfigurationSettings } from 'src/app/_models/configuration';
import { FollowUpDetails } from 'src/app/_models/followupdetails';
import { FollowUpSerchParameters } from 'src/app/_models/followupserchparameters';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestType } from 'src/app/_models/requesttype';
import { UserRole } from 'src/app/_models/userRole';
import { AlertService } from 'src/app/_services';
import { UserProfilService } from 'src/app/_services/userProfile.Service';

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
  selectedFollowUpDetails : Array<FollowUpDetails> = [];

  followUpSearchParam : FollowUpSerchParameters = new FollowUpSerchParameters();
  public advisorSelectList : Array<ListModel> =[];  
  public IsAdvisor : boolean = true;
  constructor(private followUpService : FollowupService,
      private alertService : AlertService,
      private listService : ListService, 
      private userProfileService : UserProfilService,
      private router : Router) { 
       this.IsAdvisor = ConfigurationSettings.User.RoleId == 2;
  }

  ngOnInit(): void {
    this.getSelectList();
    this.SetTableSchema();
    this.getFollowUp();
  }
  getSelectList() {
    this.listService.GetAdvisorSelectList().subscribe((result) => {
       this.advisorSelectList = <Array<ListModel>>result.Value.ResponseData
    });
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
        this.selectedFollowUpDetails =[];
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
      else if ($event.toolbarItem == ToolBarItems.Transfer) {
        this.selectedFollowUpDetails = $event.selectedItems;

        if (this.selectedFollowUpDetails == null || this.selectedFollowUpDetails.length == null || this.selectedFollowUpDetails.length == 0) {
          this.alertService.showErrorMessage("Please select at least one quotation to transfer");
        }
        else {
          this.followUpDetails = new FollowUpDetails();
          this.assignAdvisor.sidenav.open();
        }
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
    this.followUpSearchParam.UserId = this.userProfileService.CurrentUser.UserId;
    if(this.userProfileService.IsAdvisor)
    {
      this.followUpSearchParam.AdvisorId = this.userProfileService.CurrentUser.UserId;
    }

    this.followUpService.Search(this.followUpSearchParam).subscribe(result => {
      this.followUpList = result.Value.ResponseData;
      this.searchBar.close();
    }, error => { console.log(error); });
  }

  SetTableSchema() {
    this.tableSettings = new TableDefaultSettings();
    this.tableSettings.ShowToolBar = true;
    this.tableSettings.ToolBarItems =[ ToolBarItems.Search , ToolBarItems.Refresh ,ToolBarItems.Transfer]
        
    let gridCommands: Array<CommandModel> = [
      { commandType: CommandType.View },
      { commandType: CommandType.Edit },
      { click: null, commandType: CommandType.Other, icon: 'queue', content: 'add', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true },
      { click: null, commandType: CommandType.Other, icon: 'transfer_within_a_station', content: 'transfer', style: { 'background-color': 'green', 'min-height': '25px', 'margin': '5px' } , customstyle : true }
    ];
    
    this.followUpTableSchema =
      [
        { ColumnField: "$$edit", ColumnHeader: "", Type: "text" , Command:gridCommands },
        { ColumnField: "RequestTypeName", ColumnHeader: "Request Type", Type: "text" },
        { ColumnField: "RequestNo", ColumnHeader: "Request No", Type: "text" },
        { ColumnField: "RequestDate", ColumnHeader: "Request Date", Type: "date" },
        { ColumnField: "FollowUpDate", ColumnHeader: "FollowUp Date", Type: "date" },
        { ColumnField: "ServiceName", ColumnHeader: "Service", Type: "text" },
        { ColumnField: "ServiceRate", ColumnHeader: "Service Rate", Type: "text" },
        { ColumnField: "StageName", ColumnHeader: "Stage", Type: "text" },
        { ColumnField: "LeadStatusName", ColumnHeader: "Status", Type: "text" },
        { ColumnField: "Department" , ColumnHeader:"Department", Type:"text" },
        { ColumnField: "AdvisorName", ColumnHeader: "Advisor", Type: "text" },
        { ColumnField: "Remark", ColumnHeader: "Remark", Type: "text" },
        { ColumnField: "Attempt", ColumnHeader: "Attempt", Type: "text" },
        { ColumnField: "ClientRating", ColumnHeader: "Client Rating", Type: "text" },
        
      ];


      if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId !== UserRole.Advisor) {
        this.followUpTableSchema.unshift({ ColumnField: "IsSelected", ColumnHeader: "", Type: "boolean" })
      }
   
  }


}
