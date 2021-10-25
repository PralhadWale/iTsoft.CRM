import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './_services';
import { Observable } from 'rxjs';
import { iTCRMLoaderService } from './core/services/ITSoftLoaderService';
import { iTCRMAlertService } from './core/services/ITSoftAlertService';
import { NavItem } from './_layout/models/nav-item';
import { NavService } from './_layout/services/nav.service';
import { UserRole } from './_models/userRole';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy , AfterViewInit {
  @ViewChild('sidenav') appDrawer: ElementRef;
  
  title = 'Meenakshi Metal crm';
  user: any = null;
  isMobile: boolean;
  mode = "side"
  uiContent = "content"
  progrssBarClass = "progress-bar";
  isloading = true;

  showLoader: boolean;


  
  version = 1.0;
  navItems: NavItem[] = [];

  constructor(
    private loaderService: iTCRMLoaderService,
    private alertService: iTCRMAlertService,
    private navService: NavService,
    // private loadingBar: SlimLoadingBarService,
    private router: Router,
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
  ) {
    console.log(" constructor")

    this.isloading = true;

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      console.log(result)
      if (result.matches) {
        // this.activateHandsetLayout();
        this.isMobile = true;
        this.mode = "over"
        this.uiContent = "mobile-content"
      }
      else {
        this.isMobile = false;
        this.mode = "side"
        this.uiContent = "content"
      }
    });
    // breakpointObserver.ngOnDestroy()

    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    })
      ;
  }

  ngOnChanges() {
    console.log(" ngOnChanges")
  }


  ngOnInit(): void {
    console.log(" ngOnInit")
    this.user = this.authService.getUser();
    
    if(this.user != null)
    {
      this.navItems = this.navService.GetRoleMenu(<UserRole>this.user.RoleId);
    }

    this.isloading = false;

    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
      this.isloading = val;
    });

    this.alertService.toast.subscribe((val: any) => {
      if (val != null) {
        setTimeout(function () {
          this.toastObj.show(val);
        }.bind(this), 200);
      }
    });
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

  logout(): void {
    // localStorage.removeItem('currentUser');
    this.authService.logout()
    this.router.navigate(['login']);
  }

  changePassword()
  {
    this.router.navigate(['changepassword']);
  }

  isAuth(isAuth?: any) {
    if (isAuth) {
      this.user = this.authService.getUser()
      this.navItems = this.navService.GetRoleMenu(<UserRole>this.user.RoleId);
      // this.user = JSON.parse(localStorage.getItem(APP_USER_PROFILE)) || <User>{};
    }
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this. progrssBarClass = "progress-bar";
      this.isloading = true;
    }
    if (event instanceof NavigationEnd) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationCancel) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
    if (event instanceof NavigationError) {
      this. progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }

  }


  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy()
    this.authService.logout()
    //   this.router.events
    // this.breakpoint.
  }

}
