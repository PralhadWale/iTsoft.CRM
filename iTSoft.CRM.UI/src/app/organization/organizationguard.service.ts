import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { OrganizationFormComponent } from './organizationForm.component';

@Injectable()
export  class OrganizationDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid Organization Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/organizations']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class OrganizationEditGuard implements CanDeactivate<OrganizationFormComponent> {

    canDeactivate(component: OrganizationFormComponent): boolean {
        if (component.organizationForm.dirty) {
            let organizationName = component.organizationForm.get('OrganizationName').value || 'New Organization';
            return confirm(`Navigate away and lose all changes to ${organizationName}?`);
        }
        return true;
    }
}
