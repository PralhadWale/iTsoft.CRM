import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from 'src/app/_models/userRole';
import { NavItem } from '../models/nav-item';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    //this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

  public GetRoleMenu(role: UserRole) : NavItem[]{
    let navItem: Array<NavItem> = [];
    if (role == UserRole.Admin || role == UserRole.Manager) {
      navItem = [
        {
          displayName: 'Dashboard',
          iconName: 'insert_chart_outline',
          route: 'dashboard',

        },
        // {
        //   displayName: 'Follow Up',
        //   iconName: 'account_tree',
        //   route: 'followup',
        // },
        {
          displayName: 'Enquiries',
          iconName: 'perm_phone_msg',
          route: 'enquiries',

        },
        {
          displayName: 'Quotations',
          iconName: 'library_books',
          route: 'quotations',
        },
        {
          displayName: 'Clients',
          iconName: 'supervised_user_circle',
          route: 'clients',
        },
        {
          displayName: 'Employee',
          iconName: 'assignment_ind',
          route: 'employees',
        },
        {
          displayName: 'Masters',
          iconName: 'admin_panel_settings',
          route: 'masters',
          children: [
            {
              displayName: 'Service',
              iconName: 'ballot',
              route: 'masters/service',
            },
            {
              displayName: 'Stage',
              iconName: 'pending_actions',
              route: 'masters/stage',
            },
            {
              displayName: 'Status',
              iconName: 'dns',
              route: 'masters/status',
            },
            {
              displayName: 'Source',
              iconName: 'assignment_returned',
              route: 'masters/source',
            },
            {
              displayName: 'Designation',
              iconName: 'badge',
              route: 'masters/designation',
            },
            {
              displayName: 'Department',
              iconName: 'museum',
              route: 'masters/department',
            },
           
          ]
        },
        {
          displayName: 'Reports',
          iconName: 'insert_drive_file',
          route: 'reports',
          children: [
            {
              displayName: 'Enquiry Report',
              iconName: 'assignment_in',
              route: 'reports/enquiry-report',
            },
            {
              displayName: 'Enquiry Service Report',
              iconName: 'assignment_in',
              route: 'reports/enquiry-service-report',
            },
            {
              displayName: 'Quotation Report',
              iconName: 'library_books',
              route: 'reports/quotation-report',
            },
            {
              displayName: 'Quotation Service Report',
              iconName: 'library_books',
              route: 'reports/quotation-service-report',
            }
          ]
        }
      ];
    }
    else if(role == UserRole.Advisor)
    {
      navItem = [
        {
          displayName: 'Dashboard',
          iconName: 'insert_chart_outline',
          route: 'dashboard',

        },
        // {
        //   displayName: 'Follow Up',
        //   iconName: 'account_tree',
        //   route: 'followup',
        // },
        {
          displayName: 'Enquiries',
          iconName: 'perm_phone_msg',
          route: 'enquiries',

        },
        {
          displayName: 'Quotations',
          iconName: 'library_books',
          route: 'quotations',
        },
        {
          displayName: 'My Clients',
          iconName: 'supervised_user_circle',
          route: 'clients',
        }
      ];
    }

    return navItem;

  }
}
