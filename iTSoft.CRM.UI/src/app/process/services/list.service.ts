import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { ServiceMaster } from 'src/app/masters/service/service.model';
import { APIService } from 'src/app/_services';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private listController = "/List/";
   
    // private requestSelectList :Array<any>= null;
    // private requestSelectList :Array<any>= null;
    // private requestSelectList :Array<any>= null;

    constructor(private apiService: APIService) { }

    GetRequestSelectList() {
        let getUrl = this.listController + "get-request-select-list";
        return this.apiService.GetData(getUrl).pipe((result)=>{

            return result;
        });
    }

    
    GetFollowupSelectList() {
        let getUrl = this.listController + "get-followup-select-list";
        return this.apiService.GetData(getUrl);
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

    
    GetDepartmentServices(departmentId : number) {
        let searchServiceURL = iTCRMSettings.Masters + "/service/search-services";
        let serviceMaster = new ServiceMaster();
        serviceMaster.DepartmentId  = departmentId;
        serviceMaster.IsActive  = true;
        return this.apiService.PostData(searchServiceURL ,serviceMaster);
    }

    GetDepartmentAdvisors(departmentId : number)
    {
        let getUrl = this.listController + "get-department-advisor-list?departmentId="+ departmentId;
        return this.apiService.GetData(getUrl);
    }


}
