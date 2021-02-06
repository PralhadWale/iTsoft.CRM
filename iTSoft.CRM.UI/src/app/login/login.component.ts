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
    // this.authenticationService.logout();
    this.model.username = "admin@taxblock.in";
    this.model.password = "12345";
    this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "dashboard";
    // this.isloading = false;
    // this.isAuthenticated =  false;

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
}
