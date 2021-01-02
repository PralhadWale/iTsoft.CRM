
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { User } from '../_models'
import { APIService } from './apiService';


const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0"
@Injectable()
export class UserProfilService {

  public dashboardURL: string = "/profile/userevenuedashboard";
  constructor(private apiService: APIService) { }


  getUseRevenueDashboard() {
    let param = "?userId="+ (<any>this.getUser()).UserId;
    return this.apiService.GetData(this.dashboardURL+param);
  }

  getUser() {
    let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user;
  }

}
