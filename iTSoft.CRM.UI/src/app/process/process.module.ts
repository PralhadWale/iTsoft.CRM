import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from './services/request.service';
import { FollowupService } from './services/followup.service';
import { ListService } from './services/list.service';
import { AddFollowupComponent } from './add-followup/add-followup.component';
import { MaterialModule } from '../shared';
import { SharedModule } from '../shared/shared.module';
import { AssignRequestAvisorComponent } from './assign-request-advisor/assign-request-advisor.component';
import { AssignFollowUpAvisorComponent } from './assign-followup-advisor/assign-followup-advisor.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { RequestServiceDetailsComponent } from './request-service-details/request-service-details.component';

@NgModule({
  declarations: [AddFollowupComponent,AssignRequestAvisorComponent,AssignFollowUpAvisorComponent, AddServiceComponent,RequestServiceDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
  ],
  providers:[RequestService,FollowupService,ListService],
  exports : [AddFollowupComponent,AssignRequestAvisorComponent,AssignFollowUpAvisorComponent,RequestServiceDetailsComponent]
})
export class ProcessModule { }
