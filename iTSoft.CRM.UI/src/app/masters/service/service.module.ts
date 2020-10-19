import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { ServiceService } from './service.service';



@NgModule({
  declarations: [ServicelistComponent],
  imports: [
    CommonModule
  ],
  providers:[ServiceService]
})
export class ServiceModule { }
