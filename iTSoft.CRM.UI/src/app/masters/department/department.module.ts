import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentlistComponent } from './departmentlist/departmentlist.component';
import { RouterModule } from '@angular/router';
import { DepartmentService } from './department.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DepartmentlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: DepartmentlistComponent }
  ])
  ],
  providers:[DepartmentService]
})
export class DepartmentModule { }
