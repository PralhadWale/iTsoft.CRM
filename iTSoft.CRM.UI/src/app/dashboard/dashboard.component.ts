/**
 * Angular  decorators and services
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { UserProfilService } from '../_services/userProfile.Service';
import { DashboardSearchParameters, DashboardService, SeriesDashboardViewModel, NameNumber, NameValue } from './dashboard.service';
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
    domain: ['#5AA454', '#E44D25', '#7aa3e5', '#a8385d', '#aae3f5', '#CFC0BB']
  };

  leadSources: Array<SeriesDashboardViewModel> = [];
  topEmployees: Array<SeriesDashboardViewModel> = [];
  leadStatus: Array<NameNumber> = [];

  departmentRevenue: Array<NameNumber> = [];
  revenueTarget: Array<NameValue> = [];

  constructor(private dashboardService: DashboardService,
    public userProfileService: UserProfilService
  ) {
    this.SetAdminDashboard();
  }

  SetAdminDashboard() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    let dashbordSearchParam = new DashboardSearchParameters();
    dashbordSearchParam.FromDate = firstDay;
    dashbordSearchParam.ToDate = lastDay;

    if (this.userProfileService.CurrentUser.RoleId == UserRole.Admin || this.userProfileService.CurrentUser.RoleId == UserRole.Manager) {

      dashbordSearchParam.AdvisorId = this.userProfileService.CurrentUser.UserId;

      let sources = [];
      this.dashboardService.GetLeadSourceDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          let response = <Array<any>>result.Value.ResponseData;
          response.forEach((l) => {
            let leadSource = new SeriesDashboardViewModel();
            leadSource.name = l.LeadSourceName;
            leadSource.series = [];
            leadSource.series.push({ name: 'Leads Created', value: l.LeadsCreated });
            leadSource.series.push({ name: 'Converted To Clients', value: l.ConvertedToClients });

            sources.push(leadSource);
          });

          this.leadSources = sources;
        }
      }, (error => {    }));


      this.departmentRevenue = [];
      this.dashboardService.GetDepartmentWiseRevenueDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          let revenue: Array<NameNumber> = [];
          let response = <Array<any>>result.Value.ResponseData;
          response.forEach((l) => {
            revenue.push({ name: l.DepartmentName, value: l.RevenueGenerated });
          });

          this.departmentRevenue = revenue;
        }
      }, (error => {    }));

      this.leadStatus = [];
      this.dashboardService.GetLeadStatusDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          let leadStatus: Array<NameNumber> = [];
          let response = <Array<any>>result.Value.ResponseData;
          response.forEach((l) => {
            leadStatus.push({ name: l.LeadStatusName, value: l.RequestCount });
          });

          this.leadStatus = leadStatus;
        }
      }, (error => {    }));

      dashbordSearchParam.NumberOfEmployees = 5;
      this.dashboardService.GetTopNEmployeeDashboard(dashbordSearchParam).subscribe(result => {
        if (result.Value.ResponseCode == 1) {
          let employeees = [];
          let response = <Array<any>>result.Value.ResponseData;
          response.forEach((l) => {
            let series = new SeriesDashboardViewModel();
            series.name = l.EmployeeName;
            series.series = [];
            series.series.push({ name: 'Target Amount', value: l.TargetAmount });
            series.series.push({ name: 'Revenue Generated', value: l.RevenueGenerated });

            employeees.push(series);
          });

          this.topEmployees = employeees;
        }
      }, (error => {  }));

    }

    this.dashboardService.GetRevenueTargetDashboard(dashbordSearchParam).subscribe(result => {
      if (result.Value.ResponseCode == 1) {
        this.revenueTarget = [];
        if (result.Value.ResponseCode == 1) {
          this.revenueTarget.push({ name: "Monthly Target", value: "₹ " + result.Value.ResponseData.MonthlyTarget });
          this.revenueTarget.push({ name: "Total Lead Generated", value: "₹ " + result.Value.ResponseData.TotalLeadGenerated });
          this.revenueTarget.push({ name: "Total Achieved", value: "₹ " + result.Value.ResponseData.TotalAchieved });
        }

      }
    }, (error => { }));




  }

  random(min = 0, max = 100) {
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
  }


}
