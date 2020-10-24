import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EnquiryListComponent } from "./enquiry-list.component";
import { EnquiryDetailGuard, EnquiryEditGuard } from "./enquiry-guard.service";
import { EnquiryFormComponent } from "./enquiry-form.component";

import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { ProcessModule } from '../process/process.module';
import { FollowupModule } from '../followup/followup.module';
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProcessModule,
    RouterModule.forChild([
      { path: "", component: EnquiryListComponent },
      {
        path: "edit/:id",
        canDeactivate: [EnquiryEditGuard],
        component: EnquiryFormComponent
      }
    ])
  ],
  declarations: [
    EnquiryListComponent,
    EnquiryFormComponent
  ],
  providers: [
    EnquiryDetailGuard,
    EnquiryEditGuard,
  ],
})
export class EnquiryModule { }
