import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFollowupComponent } from './add-followup/add-followup.component';
import { FollowupListComponent } from './followup-list/followup-list.component';
import { MaterialModule } from '../shared';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddFollowupComponent, FollowupListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(
      [
          { path: "", component: FollowupListComponent }
      ]
     )
  ]
})
export class FollowupModule { }
