import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { ProcessModule } from '../process/process.module';
import { RequestDetailsReportComponent } from "./request-details/request-details.component";
import { RequestSummeryReportComponent } from "./request-summery/request-summery.component";
@NgModule({
  imports: [
    SharedModule,
    MaterialModule,
    ProcessModule,
    RouterModule.forChild([
      { path: "enquiry-service-report", component: RequestDetailsReportComponent },
      { path: "quotation-service-report", component: RequestDetailsReportComponent },
      { path: "enquiry-report", component: RequestSummeryReportComponent },
      { path: "quotation-report", component: RequestSummeryReportComponent },
    ])
  ],
  declarations: [
    RequestDetailsReportComponent,
    RequestSummeryReportComponent
  ],
  providers: [ ],
})
export class ReportModule { }
