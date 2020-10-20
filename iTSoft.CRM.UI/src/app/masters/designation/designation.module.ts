import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationlistComponent } from './designationlist/designationlist.component';
import { RouterModule } from '@angular/router';
import { DesignationService } from './designation.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [DesignationlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: DesignationlistComponent }
  ])
  ],
  providers:[DesignationService]
})
export class DesignationModule { }
