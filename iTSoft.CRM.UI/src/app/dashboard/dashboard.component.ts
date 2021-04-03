/**
 * Angular  decorators and services
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { UserProfilService } from '../_services/userProfile.Service';
import { DashboardSearchParameters, DashboardService, DepartmentWiseRevenueDashboardViewModel, LeadSourceDashboardViewModel, LeadStatusDashboardViewModel, RevenueTargetDashboardViewModel, TopNEmployeeDashboardViewModel } from './dashboard.service';
import { ConfigurationSettings } from '../_models/configuration';
import { UserRole } from '../_models/userRole';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'dashboard',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  
  ngOnInit() {

  }

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#7aa3e5']
  };
 

  onSelect(event) {
    console.log(event);
  }

  leadSources: Array<LeadSourceDashboardViewModel> = [];
  leadStatus : Array<LeadStatusDashboardViewModel> = [];
  topEmployees : Array<TopNEmployeeDashboardViewModel> = [];
  departmentRevenue : Array<DepartmentWiseRevenueDashboardViewModel> = [];
  revenueTarget : Array<RevenueTargetDashboardViewModel> = [];
  constructor(private dashboardService : DashboardService) {
    this.SetAdminDashboard();
  }

  SetAdminDashboard() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let dashbordSearchParam = new DashboardSearchParameters();
    dashbordSearchParam.FromDate  = firstDay;
    dashbordSearchParam.ToDate = lastDay;

    if (ConfigurationSettings.User && <UserRole>ConfigurationSettings.User.RoleId == UserRole.Admin) {
      this.dashboardService.GetLeadSourceDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          this.leadSources = result.Value.ResponseData;
        }
      }, (error => {
      }));

      this.dashboardService.GetDepartmentWiseRevenueDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          this.departmentRevenue = result.Value.ResponseData;
        }
      }, (error => {
      }));

      this.dashboardService.GetLeadStatusDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          this.leadStatus = result.Value.ResponseData;
        }
      }, (error => {
      }));

      dashbordSearchParam.NumberOfEmployees = 5;
      this.dashboardService.GetTopNEmployeeDashboard(dashbordSearchParam).subscribe(result => {
        if(result.Value.ResponseCode == 1)
        {
        this.topEmployees = result.Value.ResponseData;
        }
      },(error => {
      }));

    }

    this.dashboardService.GetRevenueTargetDashboard(dashbordSearchParam).subscribe(result => {
      if(result.Value.ResponseCode == 1)
      {
        this.revenueTarget = [];
        if (result.Value.ResponseCode == 1) {
          this.revenueTarget.push({ name: "Monthly Target", value: "₹ " + result.Value.ResponseData.MonthlyTarget});
          this.revenueTarget.push({ name: "Total Lead Generated", value: "₹ " + result.Value.ResponseData.TotalLeadGenerated});
          this.revenueTarget.push({ name: "Total Achieved", value: "₹ " + result.Value.ResponseData.TotalAchieved});
        }

      }
  },(error => {
    }));

   


  }


}
