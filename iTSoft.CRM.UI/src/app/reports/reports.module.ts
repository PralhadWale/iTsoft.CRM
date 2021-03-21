import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { ProcessModule } from '../process/process.module';
import { RequestDetailsReportComponent } from "./request-details.component";
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProcessModule,
    RouterModule.forChild([
      { path: "enquiry-service-report", component: RequestDetailsReportComponent },
      { path: "quotation-service-report", component: RequestDetailsReportComponent },
    ])
  ],
  declarations: [
    RequestDetailsReportComponent,
  ],
  providers: [ ],
})
export class ReportModule { }
