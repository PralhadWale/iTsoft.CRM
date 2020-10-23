import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from './services/request.service';
import { FollowupService } from './services/followup.service';
import { ListService } from './services/list.service';
import { AddFollowupComponent } from './add-followup/add-followup.component';
import { MaterialModule } from '../shared';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AddFollowupComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers:[RequestService,FollowupService,ListService],
  exports : [AddFollowupComponent]
})
export class ProcessModule { }
