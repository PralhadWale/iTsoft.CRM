
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { User } from '../_models'
import { APIService } from './apiService';
import { ListModel } from '../_models/listmodel';
import { Observable, observable, of } from 'rxjs';
import { UserRole } from '../_models/userRole';
import { Router } from '@angular/router';


const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0"

@Injectable({
  providedIn: 'root'
})
export class UserProfilService {

  private listController = "/List/";
  public dashboardURL: string = "/profile/userevenuedashboard";
  constructor(private apiService: APIService ,private router : Router) { }



  private userDepartments: Array<ListModel> = [];

  public get CurrentUser() {
    let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    if(user == null)
    {
        localStorage.clear();
        this.router.navigate(['login']);
    }
    return user;
  }

  public get CurrentUserDepartments() : Observable<Array<ListModel>>{
    if (this.userDepartments == null || this.userDepartments.length == 0) {
      let getUrl = this.listController + "get-user-department-list?userId=" + this.CurrentUser.UserId;
      return this.apiService.GetData(getUrl).map((result: any) => {
        this.userDepartments = <Array<ListModel>>result.Value.ResponseData;
        return this.userDepartments;
      });
    }
    else {
      return of(this.userDepartments)
    }
  }


  IsUserDepartment(departmentId: number): Observable<boolean> {
   return this.CurrentUserDepartments.map((result) => {
       return result.filter( c=> c.Value == departmentId).length > 0;
    });
  }


  getUseRevenueDashboard() {
    let param = "?userId=" + (<any>this.getUser()).UserId;
    return this.apiService.GetData(this.dashboardURL + param);
  }

  getUser() {
    let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user;
  }

  public get IsAdvisor()
  {
    return this.CurrentUser.RoleId == <Number>UserRole.Advisor;
  }

  public get IsAdmin()
  {
    return this.CurrentUser.RoleId == <Number>UserRole.Admin;
  }

  public get IsManager()
  {
    return this.CurrentUser.RoleId == <Number>UserRole.Manager;
  }

}
