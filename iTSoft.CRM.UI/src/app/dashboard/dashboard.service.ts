import { Injectable } from "@angular/core";
import { iTCRMSettings } from "../core/models/iTSOFT.iTCRM.Configuration";
import { APIService } from "../_services";

@Injectable()
export class DashboardService {
  
    constructor(private apiService: APIService) { }

    URLGetLeadSourceDashboard: string = iTCRMSettings.Process + "/Dashboard/GetLeadSourceDashboard";
    URLGetLeadStatusDashboard: string = iTCRMSettings.Process + "/Dashboard/GetLeadStatusDashboard";
    URLGetRevenueTargetDashboard: string = iTCRMSettings.Process + "/Dashboard/GetRevenueTargetDashboard";
    URLGetTopNEmployeeDashboard: string = iTCRMSettings.Process + "/Dashboard/GetTopNEmployeeDashboard";
    URLGetDepartmentWiseRevenueDashboard: string = iTCRMSettings.Process + "/Dashboard/GetDepartmentWiseRevenueDashboard";
    
    GetLeadSourceDashboard(searchParam: DashboardSearchParameters) {
        return this.apiService.PostData(this.URLGetLeadSourceDashboard, searchParam);
    }

    GetLeadStatusDashboard(searchParam: DashboardSearchParameters) {
        return this.apiService.PostData(this.URLGetLeadStatusDashboard, searchParam);
    }

    GetRevenueTargetDashboard(searchParam: DashboardSearchParameters) {
        return this.apiService.PostData(this.URLGetRevenueTargetDashboard, searchParam);
    }

    GetTopNEmployeeDashboard(searchParam: DashboardSearchParameters) {
        return this.apiService.PostData(this.URLGetTopNEmployeeDashboard, searchParam);
    }

    GetDepartmentWiseRevenueDashboard(searchParam: DashboardSearchParameters) {
        return this.apiService.PostData(this.URLGetDepartmentWiseRevenueDashboard, searchParam);
    }

}


export class DashboardSearchParameters {
    AdvisorId: number;
    FromDate: Date;
    ToDate: Date;
    NumberOfEmployees: number;
}


export class LeadSourceDashboardViewModel {
    LeadSourceId: number;
    LeadSourceName: string;
    LeadsCreated: number;
    ConvertedToClients: number;
    ConversionRateInPercent: number;
}


export class RevenueTargetDashboardViewModel {
    MonthlyTarget: number;
    TotalLeadGenerated: number;
    TotalAchieved: number;
}

export class TopNEmployeeDashboardViewModel {
    EmployeeName: string;
    TargetAmount: number;
    RevenueGenerated: number;
}

export class DepartmentWiseRevenueDashboardViewModel {
    DepartmentName: string;
    RevenueGenerated: number;
}

export class LeadStatusDashboardViewModel {
    LeadStatusName: string;
    RequestCount: number;
}