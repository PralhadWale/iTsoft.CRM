import { Injectable } from '@angular/core';
import { RequestMaster } from 'src/app/_models/Request';
import { RequestSerchParameters } from 'src/app/_models/Requestserchparameters';
import { RequestViewModel } from 'src/app/_models/requestviewmodel';
import { APIService } from 'src/app/_services';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private RequestController = "/Request/";
  constructor(private apiService: APIService) {

  }

  Save(Request: RequestViewModel) {
    let url = this.RequestController + "save";
    return this.apiService.PostData(url, Request);
  }

  Search(param: RequestSerchParameters) {
    let url = this.RequestController + "search";
    return this.apiService.PostData(url, RequestSerchParameters);
  }

  Load(requestId:number) {
    let url = this.RequestController + "load";
    return this.apiService.GetData(url + "/" + requestId);
  }
}
