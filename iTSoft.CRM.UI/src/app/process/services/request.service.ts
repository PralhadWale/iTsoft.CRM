import { Injectable } from '@angular/core';
import { RequestMaster } from 'src/app/_models/Request';
import { RequestSerchParameters } from 'src/app/_models/Requestserchparameters';
import { RequestViewModel } from 'src/app/_models/requestviewmodel';
import { APIService } from 'src/app/_services';
import * as moment from 'moment';
import { RequestDetails } from 'src/app/_models/requestdetails';
import { ConfigurationSettings } from 'src/app/_models/configuration';
import { RequestServiceDetails, RequestServiceMaster } from 'src/app/_models/requestservice';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
 

  private RequestController = "/Request/";
  constructor(private apiService: APIService) {

  }

  
  UpdateService(data: any, requestServiceDetails: RequestServiceDetails[]) {
    let matchedIndex = -1;
    requestServiceDetails.forEach((item, index) => {
      if (item.ServiceId == data.ServiceId) {
        matchedIndex = index;
      }
    });

    if (matchedIndex != -1) {
      requestServiceDetails[matchedIndex] = data;
    }
  }

  RemoveService(service:RequestServiceDetails, services : Array<RequestServiceDetails>)
  {
    services.forEach((item, index) => {
      if (item.ServiceId === service.ServiceId) 
       {
         services.splice(index, 1);
       }
    });
  }

  AssignRequest(requestDetails: Array<RequestDetails>) {

    let param: Array<any> = [];

    requestDetails.forEach(item => {
      param.push({
        AdvisorId: item.AdvisorId,
        TransferPendingFollowUp: item.TransferPendingFollowUp,
        RequestId: item.RequestId,
        DepartmentId : item.DepartmentId,
        UpdatedBy: ConfigurationSettings.User.UserId,
        RequestServiceId : item.RequestServiceId
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
    request.RequestMaster.UpdatedBy = ConfigurationSettings.User.UserId;
    request.RequestMaster.UpdatedOn = new Date();


    request.RequestServiceMasters = <Array<any>>request.RequestServiceDetails;

    request.ContactPersonMasters = [];
    request.ContactPersonMasters.push(request.ContactPersonMaster);
    //request.ContactPersonMaster = null;


    let url = this.RequestController + "save";
    return this.apiService.PostData(url, request);
  }

  Search(param: RequestSerchParameters) {
    let url = this.RequestController + "search-request-services";
    return this.apiService.PostData(url, param);
  }

  SearchRequest(param: RequestSerchParameters) {
    let url = this.RequestController + "search-request";
    return this.apiService.PostData(url, param);
  }


  Load(requestId: number) {
    let url = this.RequestController + "load";
    return this.apiService.GetData(url + "?requestId=" + requestId);
  }

  LoadRequestService(requestServiceId : number)
  {
    let url = this.RequestController + "loadrequestservice";
    return this.apiService.GetData(url + "?requestServiceId=" + requestServiceId);
  }

  GetNextrequestNumber(requestTypeId: number) {
    let url = this.RequestController + "getnextrequestnumber";
    return this.apiService.GetData(url + "?requestTypeId=" + requestTypeId);
  }

  getClientUrl: string = iTCRMSettings.Masters + "/client/findClient";
  FindClient(ClientId: number) {
    return this.apiService.GetData(this.getClientUrl + "?clientId=" + ClientId);
  }

}
