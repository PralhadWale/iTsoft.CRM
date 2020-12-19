import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { User } from '../_models'
import { APIService } from './apiService';


const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0"
@Injectable()
export class AuthenticationService {

  public loginURL: string = "/account/login";
  constructor(private apiService: APIService) { }

  login(user: any) {

    return this.apiService.PostData(this.loginURL, user).map((response: Response) => {
      let data = (<any>response);
      let user = <User>data;
      if (!user) {
        user = new User();
        user.firstname="Admin";
      }

      user.token = data.Token;// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

      if (user) {
        // store user details and token in local storage to keep user logged in between page refreshes

        user.isAuthenticated = true;
        localStorage.setItem(APP_USER_PROFILE, JSON.stringify(user));
      }
    });

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(APP_USER_PROFILE);
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
