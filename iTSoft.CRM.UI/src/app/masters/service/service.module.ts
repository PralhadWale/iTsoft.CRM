import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { ServiceService } from './service.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ServicelistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: ServicelistComponent }
  ])
    
  ],
  providers:[ServiceService]
})
export class ServiceModule { }
