import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';
import { EnquiryFormComponent } from '../enquiry/enquiry-form.component';

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
export  class QuotationEditGuard implements CanDeactivate<EnquiryFormComponent> {

    canDeactivate(component: EnquiryFormComponent): boolean {
        if (component.enquiryForm.dirty) {
            let quotationName = component.enquiryForm.get('RequestNo').value || 'New Quotation';
            return confirm(`Navigate away and lose all changes to ${quotationName}?`);
        }
        return true;
    }
}
