import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from './services/request.service';
import { FollowupService } from './services/followup.service';
import { ListService } from './services/list.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[RequestService,FollowupService,ListService]
})
export class ProcessModule { }
