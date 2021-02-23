/**
 * Angular  decorators and services
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { UserProfilService } from '../_services/userProfile.Service';
import { DashboardSearchParameters, DashboardService, DepartmentWiseRevenueDashboardViewModel, LeadSourceDashboardViewModel, LeadStatusDashboardViewModel, RevenueTargetDashboardViewModel, TopNEmployeeDashboardViewModel } from './dashboard.service';
import { map } from 'rxjs/internal/operators/map';
import { ConfigurationSettings } from '../_models/configuration';
import { UserRole } from '../_models/userRole';


interface InfoBox {
    title: string;
    value: string;
    isIncrease: boolean;
    color: string;
    percentValue: string;
    icon: string;
    isCurrency: boolean;
}

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

  cardLayout = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(({ matches }) => {
      if (matches) { 
        return {
          columns: 1,
          miniCard: { cols: 1, rows: 1 },
          chart: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 },
        };
      }

     return {
        columns: 6,
        miniCard: { cols: 2, rows: 2 },
        chart: { cols: 3, rows: 3 },
        table: { cols: 3, rows: 3 },
      };
    })
  );
  

  colNum: number = 2;
  rowHeight = '120px';
  chartColNum = 2;
  chartRowHeight = '450px';
  cardClass = 'dash-card';

  mediaQueryList: any = null;
  mediaQueryMin: any = null;
  isMobile = false;
  chartColspan = 1;
  infoBoxes: InfoBox[] = [];

  leadSources: Array<LeadSourceDashboardViewModel> = [];
  leadStatus : Array<LeadStatusDashboardViewModel> = [];
  topEmployees : Array<TopNEmployeeDashboardViewModel> = [];
  departmentRevenue : Array<DepartmentWiseRevenueDashboardViewModel> = [];
  revenueTarget : RevenueTargetDashboardViewModel = new RevenueTargetDashboardViewModel();
  isAdmin:boolean = false;

  constructor(
  
    private dashboardService : DashboardService,
    private breakpointObserver: BreakpointObserver,) {
    // this.mediaQueryList = mediaMatcher.matchMedia('(min-width: 640px)');
    // this.mediaQueryMin = mediaMatcher.matchMedia('(min-width: 960px)');


    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      this.onScreensizeChange()
    });

    //this.LoadRevenueDashboard();

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
      this.isAdmin = true;


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
      this.revenueTarget = result.Value.ResponseData;

      this.infoBoxes = [
          { title: "Expected Revenue", value: this.revenueTarget.MonthlyTarget.toString(), isIncrease: false, color: "accent", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
          { title: "Lead. Generated", value: this.revenueTarget.TotalLeadGenerated.toString(), isIncrease: true, color: "warn", percentValue: "0.4565", icon: "shopping_cart", isCurrency: false },
          { title: "Total Achieved", value: this.revenueTarget.TotalAchieved.toString(), isIncrease: true, color: "primary", percentValue: "0.5383", icon: "payments", isCurrency: true },
         // { title: "Returning Customers", value: "35", isIncrease: false, color: "primary", percentValue: "0.8361", icon: "portrait", isCurrency: false }
      ]

    }
  },(error => {
    }));

   


  }



  lineChartData: Array<number[]> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  lineChartLabels: Array<string> = ['September', 'October'];
  lineChartType: string = 'line';
  pieChartType: string = 'pie';

  lineChartOptions: any = {};

  // Pie
  pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  pieChartData: number[] = [300, 500, 100];

  randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }

  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {

  }


  onScreensizeChange() {
    // debugger
    const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
    const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
    console.log(
      ` isLess600  ${isLess600} 
        isLess1000 ${isLess1000}  `
    )
    if (isLess1000) {
      if (isLess600) {
        // this.fieldColspan = 12;
        this.colNum = 1;
        this.chartColNum = 1;
        this.chartColspan = 1;
      }
      else {
        this.colNum = 2;
        this.chartColNum = 1;
        this.chartColspan = 2;
      }
    }
    else {
      this.colNum = 4;
      this.chartColNum = 2;
      this.chartColspan = 2;

    }
  }
}
