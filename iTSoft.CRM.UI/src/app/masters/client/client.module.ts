import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientService } from './client.service';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientlistComponent } from './clientlist/clientlist.component';

@NgModule({
  declarations: [ClientlistComponent , AddClientComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: ClientlistComponent },
      { path:"edit/:id" , component:AddClientComponent}
  ])
  ],
  providers:[ClientService]
})
export class ClientModule { }
