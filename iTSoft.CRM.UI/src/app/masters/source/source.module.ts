import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SourcelistComponent } from './sourcelist/sourcelist.component';
import { SourceService } from './source.service';



@NgModule({
  declarations: [SourcelistComponent],
  imports: [
    CommonModule
  ],
  providers:[SourceService]
})
export class SourceModule { }
