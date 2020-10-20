import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatuslistComponent } from './statuslist/statuslist.component';
import { StatusService } from './status.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StatuslistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: StatuslistComponent }
  ])
  ],
  providers:[StatusService]
})
export class StatusModule { }
