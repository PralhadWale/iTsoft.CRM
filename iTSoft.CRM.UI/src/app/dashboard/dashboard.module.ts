import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { MaterialModule } from "../shared/material.module";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxChartsModule } from "@swimlane/ngx-charts";


@NgModule({
    imports: [
        SharedModule,
        NgxChartsModule,
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
