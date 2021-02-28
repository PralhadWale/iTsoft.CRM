import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeeListComponent } from "./employeeList.component";
import {
    EmployeeDetailGuard,
    EmployeeEditGuard
} from "./employee-guard.service";
import { EmployeeFormComponent } from "./employeeForm.component";

import { EmployeeService } from "./employee.service";
import { SharedModule } from "../../shared/shared.module";

import { MaterialModule } from "../../shared/material.module";


@NgModule({
    imports: [
        SharedModule,
    // ReactiveFormsModule,
       MaterialModule,
        RouterModule.forChild([
            { path: "", component: EmployeeListComponent },
            {
                path: "new/",
                canDeactivate: [EmployeeEditGuard],
                component: EmployeeFormComponent
            },
            {
                path: "edit/:id",
                canDeactivate: [EmployeeEditGuard],
                component: EmployeeFormComponent
            }
        ])
    ],
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        EmployeeListComponent,
        EmployeeFormComponent
    ],
    providers: [EmployeeService, EmployeeDetailGuard, EmployeeEditGuard,
    ],
    // entryComponents: [MatOption],
    exports: [
        EmployeeListComponent,
        EmployeeFormComponent,

    ]
})
export class EmployeeModule { }
