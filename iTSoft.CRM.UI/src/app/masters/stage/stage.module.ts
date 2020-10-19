import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagelistComponent } from './stagelist/stagelist.component';
import { StageService } from './stage.service';



@NgModule({
  declarations: [StagelistComponent],
  imports: [
    CommonModule
  ],
  providers:[StageService]
})
export class StageModule { }
