import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcelistComponent } from './sourcelist/sourcelist.component';
import { SourceService } from './source.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [SourcelistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: SourcelistComponent }
  ])
  ],
  providers:[SourceService]
})
export class SourceModule { }
