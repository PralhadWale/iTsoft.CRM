import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { QuotationListComponent } from "./quotation-list.component";
import {
  QuotationDetailGuard,
  QuotationEditGuard
} from "./quotation-guard.service";
import { QuotationFormComponent } from "./quotation-form.component";

import { QuotationService } from "./quotation.service";
import { SharedModule } from "../shared/shared.module";

import { MaterialModule } from "../shared/material.module";
import { ProcessModule } from '../process/process.module';


@NgModule({
  imports: [
    SharedModule,
    
    // ReactiveFormsModule,
    MaterialModule,
    ProcessModule,
    RouterModule.forChild([
      { path: "", component: QuotationListComponent },
      {
        path: "new/",
        canDeactivate: [QuotationEditGuard],
        component: QuotationFormComponent
      },
      {
        path: "edit/:id",
        canDeactivate: [QuotationEditGuard],
        component: QuotationFormComponent
      }
    ])
  ],
  declarations: [
    /**
     * Components / Directives/ Pipes
     */
    QuotationListComponent,
    QuotationFormComponent
  ],
  providers: [QuotationService, QuotationDetailGuard, QuotationEditGuard,
  ],
  // entryComponents: [MatOption],
  exports: [
    QuotationListComponent,
    QuotationFormComponent,

  ]
})
export class QuotationModule { }
