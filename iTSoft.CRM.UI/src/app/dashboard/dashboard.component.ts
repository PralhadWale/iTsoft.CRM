/**
 * Angular  decorators and services
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { AuthenticationService } from '../_services';
import { UserProfilService } from '../_services/userProfile.Service';
import { RevenueDashboardData } from '../_models/revenueDashboardData';
import { DashboardSearchParameters, DashboardService, DepartmentWiseRevenueDashboardViewModel, LeadSourceDashboardViewModel, LeadStatusDashboardViewModel, RevenueTargetDashboardViewModel, TopNEmployeeDashboardViewModel } from './dashboard.service';


interface InfoBox {
  bgClass: string;
  icon: string;
  title: string;
  subtitle: string;
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
  

  constructor(
    private userProfile: UserProfilService,
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
    
    this.dashboardService.GetLeadSourceDashboard(dashbordSearchParam).subscribe(result => {
      if(result.Value.ResponseCode == 1)
      {
      this.leadSources = result.Value.ResponseData;
      }
    },(error => {
    }));

    this.dashboardService.GetDepartmentWiseRevenueDashboard(dashbordSearchParam).subscribe(result => {
      if(result.Value.ResponseCode == 1)
      {
      this.departmentRevenue = result.Value.ResponseData;
      }
    },(error => {
    }));

    this.dashboardService.GetLeadStatusDashboard(dashbordSearchParam).subscribe(result => {
      if(result.Value.ResponseCode == 1)
      {
      this.leadStatus = result.Value.ResponseData;
      }
    },(error => {
    }));

    this.dashboardService.GetRevenueTargetDashboard(dashbordSearchParam).subscribe(result => {
      if(result.Value.ResponseCode == 1)
      {
      this.revenueTarget = result.Value.ResponseData;

      this.infoBoxes = [
        {
          bgClass: "user-registration",
          icon: "account_balance",
          title: "Expected Revenue",
          subtitle: this.revenueTarget.MonthlyTarget.toString(),
        },
        {
          bgClass: "new-order",
          icon: "account_balance_wallet",
          title: "Lead. Generated",
          subtitle: this.revenueTarget.TotalLeadGenerated.toString(),
        },
        {
          bgClass: "user-registration",
          icon: "card_travel",
          title: "Total Achieved",
          subtitle: this.revenueTarget.TotalAchieved.toString(),
        }
      ]

    }
  },(error => {
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





  LoadRevenueDashboard() {
    this.userProfile.getUseRevenueDashboard().subscribe((result) => {
      let revenueDashboardData = <RevenueDashboardData>result.Value;


      this.infoBoxes = [
        {
          bgClass: "user-registration",
          icon: "account_balance",
          title: "Total Exp Revenue",
          subtitle: revenueDashboardData.TotalExpRevenue.toString(),
        },
        {
          bgClass: "new-order",
          icon: "account_balance_wallet",
          title: "Total Act. Revenue",
          subtitle: revenueDashboardData.TotalActRevenue.toString(),
        },
        {
          bgClass: "user-registration",
          icon: "card_travel",
          title: "Monthly Exp Revenue",
          subtitle: revenueDashboardData.MonthlyExpRevenue.toString(),
        },
        {
          bgClass: "new-order",
          icon: "card_travel",
          title: "Monthly Act. Revenue",
          subtitle: revenueDashboardData.MonthlyActRevenue.toString(),
        },
        {
          bgClass: "user-registration",
          icon: "card_travel",
          title: "Today's Exp. Revenue",
          subtitle: revenueDashboardData.TodaysExpRevenue.toString(),
        },
        {
          bgClass: "new-order",
          icon: "card_travel",
          title: "Today's Act. Revenue",
          subtitle: revenueDashboardData.TodaysActRevenue.toString(),
        },

      ];

    }, (error) => {

    });
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
