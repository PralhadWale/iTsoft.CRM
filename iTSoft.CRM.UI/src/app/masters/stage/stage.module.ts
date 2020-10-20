import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StagelistComponent } from './stagelist/stagelist.component';
import { StageService } from './stage.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StagelistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: StagelistComponent }
  ])
  ],
  providers:[StageService]
})
export class StageModule { }
