import { Injectable } from '@angular/core';
import { APIService } from 'src/app/_services';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    private listController = "/List/";
    constructor(private apiService: APIService) { }

    GetRequestSelectList() {
        let getUrl = this.listController + "get-request-select-list";
        return this.apiService.GetData(getUrl);
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

}
