import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatelistComponent } from './statelist/statelist.component';
import { StateService } from './state.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [StatelistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: StatelistComponent }
  ])
  ],
  providers:[StateService]
})
export class StateModule { }
