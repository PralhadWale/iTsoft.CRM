import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OrganizationListComponent } from "./organizationlist.component";
import {
  OrganizationDetailGuard,
  OrganizationEditGuard
} from "./organizationGuard.service";
import { OrganizationFormComponent } from "./organizationForm.component";

import { OrganizationService } from "./organization.service";
import { SharedModule } from "../shared/shared.module";

import { MaterialModule } from "../shared/material.module";


@NgModule({
  imports: [
    SharedModule,
    // ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild([
      { path: "", component: OrganizationListComponent },
      {
        path: "new/",
        canDeactivate: [OrganizationEditGuard],
        component: OrganizationFormComponent
      },
      {
        path: "edit/:id",
        canDeactivate: [OrganizationEditGuard],
        component: OrganizationFormComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    OrganizationListComponent,
    OrganizationFormComponent
  ],
  providers: [OrganizationService, OrganizationDetailGuard, OrganizationEditGuard,
  ],
  // entryComponents: [MatOption],
  exports: [
    OrganizationListComponent,
    OrganizationFormComponent,

  ]
})
export class OrganizationModule { }
