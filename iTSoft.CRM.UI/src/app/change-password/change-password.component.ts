import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertService, AuthenticationService } from "../_services";

@Component({
  selector: "change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  model: any = {};
  loginModel: any = {};
  isValidating = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "dashboard";
    this.resetAll();
  }

  changePassword() {
    this.isValidating = true;
    this.model.UserId = this.authenticationService.getUser().UserId;
    if (this.model.newPassword == this.model.confirmPassword) {
      this.authenticationService.changePassword(this.model).subscribe(
        () => {
          this.alertService.showSuccessMessage("Password changed successfully");
          this.isValidating = false;
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
    else {
      this.alertService.showErrorMessage("Please enter valid password & confirm password");
      this.isValidating = false;
    }
  }

  resetAll() {
    this.loginModel = {};
    this.model = {};
    this.model.username = "";
    this.model.password = "";
    this.model.newPassword = "";
    this.model.confirmPassword = "";
  }
}
