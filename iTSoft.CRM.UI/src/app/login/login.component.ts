import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertService, AuthenticationService } from "../_services";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  model: any = {};
  loginModel : any = {};
  isUserVerified = false;
  isForgotPassword = false;
  isOTPVerified = false;
  isValidating = false;
  returnUrl: string;
  // isloading = true;
  // isAuthenticated = false;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService : AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  
    this.returnUrl =  this.route.snapshot.queryParams["returnUrl"] || "dashboard";
    this.resetAll();
  }

  login() {
    this.isValidating = true;
    this.authenticationService.login(this.model).subscribe(
      () => {
        this.isValidating = false;
        console.log("login " + this.returnUrl);
        this.isAuth.emit(true);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.alertService.showWarningMessage(error.error);
        this.isValidating = false;
      },
      () => {

      }
    );
  }

  verifyUser()
  {
    this.isValidating = true;
    this.authenticationService.verifyAccount(this.model.username).subscribe(
      (result) => {
        this.isValidating = false;
        this.isUserVerified  = true;
        this.isOTPVerified = false;
        this.loginModel = result.Value;
      },
      error => {
        console.log(error);
        this.alertService.showWarningMessage(error.error);
        this.isValidating = false;
      },
      () => {

      }
    );
  }

  verifyOTP()
  {
    this.isValidating = true;
    this.model.UserId = this.loginModel.UserID;
    this.authenticationService.verifyOTP(this.model).subscribe(
      (result) => {
        this.isValidating = false;
        this.isUserVerified  = false;
        this.isOTPVerified = true;
      },
      error => {
        console.log(error);
        this.alertService.showWarningMessage(error.error);
        this.isValidating = false;
      },
      () => {

      }
    );
  }

  resetPassword()
  {
    if (this.loginModel && this.model.password == this.model.confirmPassword) {
      this.isValidating = true;

      this.loginModel.Password = this.model.password;
      if(this.loginModel.Email == null || this.loginModel.Email == '')
      {
        this.loginModel.Email = this.model.username;
      }
      
      this.authenticationService.forgotPassword(this.loginModel).subscribe(
        () => {
          this.alertService.showErrorMessage("Password reset successfully")
          this.isValidating = false;
          this.resetAll();
        },
        error => {
          console.log(error);
          this.alertService.showWarningMessage(error.error);
          this.isValidating = false;
        },
      );
    }
    else 
    {
      this.alertService.showErrorMessage("Please enter valid password & confirm password");
      this.isValidating = false;
    }
  }

  resetAll()
  {
    this.isOTPVerified=false;
    this.isUserVerified = false;
    this.isForgotPassword = false;
    this.loginModel = {};
    this.model = {};
    this.model.username = "";
    this.model.password = "";
    this.model.confirmPassword = "";
  }
}
