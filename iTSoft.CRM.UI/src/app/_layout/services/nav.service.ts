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
          iconName: 'account_tree',
          route: 'quotations',
        },
        {
          displayName: 'Clients',
          iconName: 'person_pin',
          route: 'clients',
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
              displayName: 'Department',
              iconName: 'museum',
              route: 'masters/department',
            },
            {
              displayName: 'Employee',
              iconName: 'person_pin',
              route: 'employees',
            },
          ]
        },
        {
          displayName: 'Reports',
          iconName: 'videocam',
          route: 'reports',
          children: [
            {
              displayName: 'Enquiry Report',
              iconName: 'account_tree',
              route: 'reports/enquiry-report',
            },
            {
              displayName: 'Enquiry Service Report',
              iconName: 'account_tree',
              route: 'reports/enquiry-service-report',
            },
            {
              displayName: 'Quotation Report',
              iconName: 'account_tree',
              route: 'reports/quotation-report',
            },
            {
              displayName: 'Quotation Service Report',
              iconName: 'account_tree',
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
          iconName: 'account_tree',
          route: 'quotations',
        },
        {
          displayName: 'My Clients',
          iconName: 'person_pin',
          route: 'clients',
        }
      ];
    }

    return navItem;

  }
}
