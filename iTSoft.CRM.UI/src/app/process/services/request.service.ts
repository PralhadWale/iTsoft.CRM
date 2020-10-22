import { Injectable } from '@angular/core';
import { RequestMaster } from 'src/app/_models/Request';
import { RequestSerchParameters } from 'src/app/_models/Requestserchparameters';
import { RequestViewModel } from 'src/app/_models/requestviewmodel';
import { APIService } from 'src/app/_services';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private RequestController = "/Request/";
  constructor(private apiService: APIService) {

  }

  Save(request: RequestViewModel) {
    // request.RequestMaster.RequestDate = moment(request.RequestMaster.RequestDate).format('dd-MMM-yyyy');
    // request.RequestMaster.DOB = moment(request.RequestMaster.DOB).format('dd-MMM-yyyy');

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
}
