import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmaillistComponent } from './emaillist/emaillist.component';
import { RouterModule } from '@angular/router';
import { EmailService } from './email.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [EmaillistComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: "", component: EmaillistComponent }
  ])
  ],
  providers:[EmailService]
})
export class EmailModule { }
