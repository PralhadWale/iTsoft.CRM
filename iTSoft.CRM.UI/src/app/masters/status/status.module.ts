import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatuslistComponent } from './statuslist/statuslist.component';
import { StatusService } from './status.service';



@NgModule({
  declarations: [StatuslistComponent],
  imports: [
    CommonModule
  ],
  providers:[StatusService]
})
export class StatusModule { }
