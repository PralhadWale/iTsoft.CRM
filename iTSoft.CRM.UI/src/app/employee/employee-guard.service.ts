import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { EmployeeFormComponent } from './employeeForm.component';

@Injectable()
export  class EmployeeDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid employee Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/employee-list']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class EmployeeEditGuard implements CanDeactivate<EmployeeFormComponent> {

    canDeactivate(component: EmployeeFormComponent): boolean {
        // if (component.employeeForm.dirty) {
        //     let employeeName = component.employeeForm.get('FirstName').value || 'New Employee';
        //     return confirm(`Navigate away and lose all changes to ${employeeName}?`);
        // }
        return true;
    }
}
