import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";


@NgModule({
    imports: [
        SharedModule,
    // ReactiveFormsModule,
       MaterialModule,
        RouterModule.forChild([
            { path: "", component: DashboardComponent }
        ])
    ],
    declarations: [
       DashboardComponent
    ],
    providers: [DashboardService],
   
})
export class DashboardModule { }
