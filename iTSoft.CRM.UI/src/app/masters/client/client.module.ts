import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientlistComponent } from './clientlist/clientlist.component';
import { RouterModule } from '@angular/router';
import { ClientService } from './client.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [ClientlistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: ClientlistComponent }
  ])
  ],
  providers:[ClientService]
})
export class ClientModule { }
