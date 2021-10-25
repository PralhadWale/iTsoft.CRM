import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EnquiryListComponent } from "./enquiry-list.component";
import { EnquiryDetailGuard, EnquiryEditGuard } from "./enquiry-guard.service";
import { EnquiryFormComponent } from "./enquiry-form.component";

import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { ProcessModule } from '../process/process.module';
import { FollowupModule } from '../followup/followup.module';
import { RequestServiceDetailsComponent } from "../process/request-service-details/request-service-details.component";
import { NgxEditorModule } from "ngx-editor";
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProcessModule,
    NgxEditorModule,
    RouterModule.forChild([
      { path: "", component: EnquiryListComponent },
      {
        path: "edit/:id/:clientId/:requestTypeId",
        canDeactivate: [EnquiryEditGuard],
        component: EnquiryFormComponent
      },
      {
        path: "followUp/:requestServiceId",
        canDeactivate: [EnquiryEditGuard],
        component: RequestServiceDetailsComponent
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
