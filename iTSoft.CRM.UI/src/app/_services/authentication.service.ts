import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { User } from '../_models'
import { APIService } from './apiService';


const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0"
@Injectable()
export class AuthenticationService {

  public loginURL: string = "/account/login";
  public verifyotpURL: string = "/account/verifyotp";
  public forgotpasswordURL : string = "/account/forgotpassword";
  public changepasswordURL : string = "/account/changepassword";
  public verifyaccountURL : string = "/account/verifyaccount";
 

  constructor(private apiService: APIService) { }

  login(user: any) {

    return this.apiService.PostData(this.loginURL, user).map((response: Response) => {
      let data = (<any>response).Value;
      let user = <User>data;
      if (user) {
        user.isAuthenticated = true;
        localStorage.setItem(APP_USER_PROFILE, JSON.stringify(user));
      }
    });

  }

  forgotPassword(user: any) {
    return this.apiService.PostData(this.forgotpasswordURL, user);
  }

  changePassword(user: any) {
    return this.apiService.PostData(this.changepasswordURL, user);
  }

  verifyOTP(user: any) {
    return this.apiService.PostData(this.verifyotpURL, user);
  }

  verifyAccount(userName: string) {
    return this.apiService.GetData(this.verifyaccountURL +"?userName=" + userName);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
  }

  isAuthenticated() {
    let user = this.getUser() // <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user && user.isAuthenticated ? true : false;
  }

  getUser() {
    let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
    return user;
  }

}
