import { Injectable } from '@angular/core';
import { RequestMaster } from 'src/app/_models/Request';
import { RequestSerchParameters } from 'src/app/_models/Requestserchparameters';
import { RequestViewModel } from 'src/app/_models/requestviewmodel';
import { APIService } from 'src/app/_services';
import * as moment from 'moment';
import { RequestDetails } from 'src/app/_models/requestdetails';
import { ConfigurationSettings } from 'src/app/_models/configuration';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
 
  private RequestController = "/Request/";
  constructor(private apiService: APIService) {

  }

  AssignRequest(requestDetails: Array<RequestDetails>) {

    let param : Array<any> = [];

    requestDetails.forEach(item => {
      param.push({
        AdvisorId: item.AdvisorId,
        TransferPendingFollowUp: item.TransferPendingFollowUp,
        RequestId: item.RequestId,
        UpdatedBy: ConfigurationSettings.User.UserId
      });
    });

    let url = this.RequestController + "assign";
    return this.apiService.PostData(url, param);
  }

  Save(request: RequestViewModel) {
    // request.RequestMaster.RequestDate = moment(request.RequestMaster.RequestDate).format('dd-MMM-yyyy');
    // request.RequestMaster.DOB = moment(request.RequestMaster.DOB).format('dd-MMM-yyyy');
    request.RequestMaster.AdvisorId = ConfigurationSettings.User.UserId;
    request.RequestMaster.AddedBy = ConfigurationSettings.User.UserId;
    request.RequestMaster.AddedOn = new Date();
    let url = this.RequestController + "save";
    return this.apiService.PostData(url, request);
  }

  Search(param: RequestSerchParameters) {
    let url = this.RequestController + "search";
    return this.apiService.PostData(url, param);
  }

  Load(requestId:number) {
    let url = this.RequestController + "load";
    return this.apiService.GetData(url + "?requestId=" + requestId);
  }

  GetNextrequestNumber(requestTypeId: number) {
    let url = this.RequestController + "getnextrequestnumber";
    return this.apiService.GetData(url + "?requestTypeId=" + requestTypeId);
  }
}
