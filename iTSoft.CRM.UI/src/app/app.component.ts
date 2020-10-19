import { Component, OnInit, OnDestroy, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './_services';
import { Observable } from 'rxjs';
import { iTCRMLoaderService } from './core/services/ITSoftLoaderService';
import { iTCRMAlertService } from './core/services/ITSoftAlertService';
import { NavItem } from './_layout/models/nav-item';
import { NavService } from './_layout/services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy , AfterViewInit {
  @ViewChild('sidenav') appDrawer: ElementRef;
  
  title = 'taxblock crm';
  user: any = null;
  isMobile: boolean;
  mode = "side"
  uiContent = "content"
  progrssBarClass = "progress-bar";
  isloading = true;

  showLoader: boolean;


  
  version = 1.0;
  navItems: NavItem[] = [
    {
      displayName: 'Dashboard',
      iconName: 'insert_chart_outline',
      route: 'dashboard',
     
    },
    {
      displayName: 'Todays Folloup',
      iconName: 'account_tree',
      route: 'todays-followup',
    },
    {
      displayName: 'Masters',
      iconName: 'videocam',
      route: 'masters',
      children: [
        {
          displayName: 'Service',
          iconName: 'group',
          route: 'masters/service',
        },
        {
          displayName: 'Stage',
          iconName: 'group',
          route: 'masters/stage',
        },
        {
          displayName: 'Status',
          iconName: 'group',
          route: 'masters/status',
        },
        {
          displayName: 'Source',
          iconName: 'group',
          route: 'masters/source',
        },
        {
          displayName: 'Designation',
          iconName: 'group',
          route: 'masters/designation',
        },
        {
          displayName: 'Organization',
          iconName: 'museum',
          route: 'organizations',
        },
        {
          displayName: 'Employee',
          iconName: 'person_pin',
          route: 'employees',
        },
      ]
    },
    {
      displayName: 'Enquiries',
      iconName: 'perm_phone_msg',
      route: 'enquiries',
     
    },
    {
      displayName: 'Quotations',
      iconName: 'account_tree',
      route: 'quotations',
    },
    
    {
      displayName: 'Quotations',
      iconName: 'account_tree',
      route: 'quotations',
    },
    {
      displayName: 'Reports',
      iconName: 'videocam',
      route: '',
      children: [
        {
          displayName: 'Follow up report',
          iconName: 'account_tree',
          route: 'follow-up-report',
        }
      ]
    }
  ];

  constructor(
    private loaderService: iTCRMLoaderService,
    private alertService: iTCRMAlertService,
    private navService: NavService,
    // private loadingBar: SlimLoadingBarService,
    private router: Router,
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
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
    this.isloading = false;

    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
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



  isAuth(isAuth?: any) {
    if (isAuth) {
      this.user = this.authService.getUser()
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
