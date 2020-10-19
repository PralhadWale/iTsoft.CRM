import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { ITMatTableComponent } from './it-mat-table.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ITMatTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule, 
    MaterialModule,
  ],
  exports: [ITMatTableComponent]
})
export class TableLayoutModule { }
