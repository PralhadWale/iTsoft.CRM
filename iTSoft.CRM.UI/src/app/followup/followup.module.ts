import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFollowupComponent } from './add-followup/add-followup.component';
import { FollowupListComponent } from './followup-list/followup-list.component';



@NgModule({
  declarations: [AddFollowupComponent, FollowupListComponent],
  imports: [
    CommonModule
  ]
})
export class FollowupModule { }
