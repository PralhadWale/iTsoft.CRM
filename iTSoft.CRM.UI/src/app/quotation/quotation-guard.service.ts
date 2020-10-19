import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';

import { QuotationFormComponent } from './quotation-form.component';

@Injectable()
export  class QuotationDetailGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let id = +route.url[1].path;
        if (isNaN(id) || id < 1) {
            alert('Invalid quotation Id');
            // start a new navigation to redirect to list page
            this.router.navigate(['/quotations']);
            // abort current navigation
            return false;
        };
        return true;
    }
}

@Injectable()
export  class QuotationEditGuard implements CanDeactivate<QuotationFormComponent> {

    canDeactivate(component: QuotationFormComponent): boolean {
        if (component.quotationForm.dirty) {
            let quotationName = component.quotationForm.get('firstname').value || 'New Quotation';
            return confirm(`Navigate away and lose all changes to ${quotationName}?`);
        }
        return true;
    }
}
