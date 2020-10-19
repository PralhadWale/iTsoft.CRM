import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatelistComponent } from './statelist/statelist.component';
import { StateService } from './state.service';



@NgModule({
  declarations: [StatelistComponent],
  imports: [
    CommonModule
  ],
  providers:[StateService]
})
export class StateModule { }
