import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowupListComponent } from './followup-list/followup-list.component';
import { MaterialModule } from '../shared';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProcessModule } from '../process/process.module';

@NgModule({
  declarations: [FollowupListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ProcessModule,
    RouterModule.forChild(
      [
          { path: "", component: FollowupListComponent }
      ]
     )
  ],

})
export class FollowupModule { }
