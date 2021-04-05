import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { ServiceMaster } from 'src/app/masters/service/service.model';
import { StatusMaster } from 'src/app/masters/status/status.model';
import { LeadStatus } from 'src/app/_models/leadStatus';
import { ListModel } from 'src/app/_models/listmodel';
import { RequestSelectListModel } from 'src/app/_models/requestselectlistmodel';
import { RequestType } from 'src/app/_models/requesttype';
import { APIService } from 'src/app/_services';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private listController = "/List/";

  // private requestSelectList :Array<any>= null;
  // private requestSelectList :Array<any>= null;
  // private requestSelectList :Array<any>= null;

  followUpSelectList: RequestSelectListModel;
  requestSelectList: RequestSelectListModel;
  private leadsourceList: Array<ListModel> = [];
  private financialYearList: Array<ListModel> = [];
  private leadStatusList: Array<StatusMaster> = [];
  private nonDecisiveLeadStatusList: Array<StatusMaster> = [];
  private stageList: Array<ListModel> = [];

  constructor(private apiService: APIService) { }

  GetRequestSelectList(): Observable<RequestSelectListModel> {
    if (this.requestSelectList == null) {
      let getUrl = this.listController + "get-request-select-list";
      return this.apiService.GetData(getUrl).map((result) => {
        this.requestSelectList = result.Value.ResponseData;
        return this.requestSelectList;
      });
    }
    else {
      return of(this.requestSelectList);
    }
  }


  GetFollowupSelectList(): Observable<RequestSelectListModel> {
    if (this.followUpSelectList == null) {
      let getUrl = this.listController + "get-followup-select-list";
      return this.apiService.GetData(getUrl).map((result) => {
        this.followUpSelectList = result.Value.ResponseData;
        return this.followUpSelectList;
      });
    }
    else {
      return of(this.followUpSelectList);
    }
  }

  GetEmployeeSelectList() {
    let getUrl = this.listController + "get-employee-select-list";
    return this.apiService.GetData(getUrl);
  }


  GetAdvisorSelectList() {
    let getUrl = this.listController + "get-advisor-select-list";
    return this.apiService.GetData(getUrl);
  }

  GetClientSelectList() {
    let getUrl = this.listController + "get-client-select-list";
    return this.apiService.GetData(getUrl);
  }

  GetServiceList() {
    let getUrl = iTCRMSettings.Masters + "/service/getall";;
    return this.apiService.GetData(getUrl);
  }


  GetDepartmentServices(departmentId: number) {
    let searchServiceURL = iTCRMSettings.Masters + "/service/search-services";
    let serviceMaster = new ServiceMaster();
    serviceMaster.DepartmentId = departmentId;
    serviceMaster.IsActive = true;
    return this.apiService.PostData(searchServiceURL, serviceMaster);
  }

  GetActiveDepartments() {
    let getUrl = this.listController + "get-department-list?activeOnly=true";
    return this.apiService.GetData(getUrl);
  }

  GetDepartmentAdvisors(departmentId: number) {
    let getUrl = this.listController + "get-department-advisor-list?departmentId=" + departmentId;
    return this.apiService.GetData(getUrl);
  }




  public ActiveLeadStatusList(requestType : RequestType): Observable<Array<StatusMaster>> {
    if (this.leadStatusList == null || this.leadStatusList.length == 0) {
      let getUrl = this.listController + "get-lead-status-list?activeOnly=true";
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.leadStatusList = <Array<StatusMaster>>result.Value.ResponseData;
        let statusList = this.leadStatusList.filter(f => f.RequestTypeId == requestType);
        return statusList;
      });
    }
    else {
      let statusList = this.leadStatusList.filter(f => f.RequestTypeId == requestType);
      return of(statusList);
    }
  }

  public ActiveNotDecisiveLeadStatusList(requestType : RequestType): Observable<Array<StatusMaster>> {
    if (this.leadStatusList == null || this.leadStatusList.length == 0) {
      let getUrl = this.listController + "get-lead-status-list?activeOnly=true";
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.leadStatusList = <Array<StatusMaster>>result.Value.ResponseData;
        this.nonDecisiveLeadStatusList = this.leadStatusList.filter(f => f.LeadStatusId <= 10010);
        this.nonDecisiveLeadStatusList = this.nonDecisiveLeadStatusList.filter(f => f.RequestTypeId == requestType);
        return this.nonDecisiveLeadStatusList;
      });
    }
    else {
      this.nonDecisiveLeadStatusList = this.leadStatusList.filter(f => f.LeadStatusId <= 10010);
      this.nonDecisiveLeadStatusList = this.nonDecisiveLeadStatusList.filter(f => f.RequestTypeId == requestType);
      return of(this.nonDecisiveLeadStatusList)
    }
  }

  
  public get ActiveFinancialYearList(): Observable<Array<ListModel>> {
    if (this.financialYearList == null || this.financialYearList.length == 0) {
      let getUrl = this.listController + "get-fiancial-year-list?activeOnly=true";
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.financialYearList = <Array<ListModel>>result.Value.ResponseData;
        return this.financialYearList;
      });
    }
    else {
      return of(this.financialYearList)
    }
  }


  public get ActiveLeadSourceList(): Observable<Array<ListModel>> {
    if (this.leadsourceList == null || this.leadsourceList.length == 0) {
      let getUrl = this.listController + "get-lead-source-list?activeOnly=true";
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.leadsourceList = <Array<ListModel>>result.Value.ResponseData;
        return this.leadsourceList;
      });
    }
    else {
      return of(this.leadsourceList)
    }
  }

  public GetLeadStatusName(leadStatusId: number) {
    if (this.leadStatusList && this.leadStatusList.length > 0) {
      let leadStatus = this.leadStatusList.filter(f => f.LeadStatusId == leadStatusId);
      if (leadStatus && leadStatus.length > 0) {
        return leadStatus[0].LeadStatusName;
      }
      else {
        return "";
      }
    }
    else {
      let leadStatus = this.nonDecisiveLeadStatusList.filter(f => f.LeadStatusId == leadStatusId);
      if (leadStatus && leadStatus.length > 0) {
        return leadStatus[0].LeadStatusName;
      }
      else {
        return "";
      }

    }
    return "";
  }

  public get ActiveStageList(): Observable<Array<ListModel>> {
    if (this.stageList == null || this.stageList.length == 0) {
      let getUrl = this.listController + "get-stage-list?activeOnly=true";
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.stageList = <Array<ListModel>>result.Value.ResponseData;
        return this.stageList;
      });
    }
    else {
      return of(this.stageList)
    }
  }

  public GetStageName(stageId: number) {
    let stages = this.stageList.filter(f => f.Value == stageId);
    if (stages && stages.length > 0) {
      return stages[0].Text;
    }
    else {
      return "";
    }
  }

  GetSourceName(sourceId: number): string {
    let d = this.leadsourceList.filter(f => f.Value == sourceId);
    if (d && d.length > 0) {
      return d[0].Text;
    }
    else {
      return "";
    }
  }

  GetFinancialYear(financialYearId: number): string {
    let d = this.financialYearList.filter(f => f.Value == financialYearId);
    if (d && d.length > 0) {
      return d[0].Text;
    }
    else {
      return "";
    }
  }

}
