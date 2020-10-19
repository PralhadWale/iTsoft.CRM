import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignationlistComponent } from './designationlist/designationlist.component';
import { RouterModule } from '@angular/router';
import { DesignationService } from './designation.service';



@NgModule({
  declarations: [DesignationlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: DesignationlistComponent }
  ])
  ],
  providers:[DesignationService]
})
export class DesignationModule { }
