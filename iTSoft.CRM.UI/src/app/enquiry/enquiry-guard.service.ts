import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  CanDeactivate
} from "@angular/router";
import { EnquiryFormComponent } from "./enquiry-form.component";

@Injectable()
export class EnquiryDetailGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let id = +route.url[1].path;
    if (isNaN(id) || id < 1) {
      alert("Invalid enquiry Id");
      // start a new navigation to redirect to list pcustomerId
      this.router.navigate(["/enquiries"]);
      // abort current navigation
      return false;
    }
    return true;
  }
}

@Injectable()
export class EnquiryEditGuard implements CanDeactivate<EnquiryFormComponent> {
  canDeactivate(component: EnquiryFormComponent): boolean {
    if (component.enquiryForm.dirty) {
      let enquiryName = component.enquiryForm.get("RequestNo").value || "New Enquiry";
      return confirm(`Navigate away and lose all changes to ${enquiryName}?`);
    }
    return true;
  }
}
