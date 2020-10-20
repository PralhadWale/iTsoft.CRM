import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableLayoutModule } from './table-layout/table-layout.module';
import { NamecasePipe } from './pipes/namecase/namecase.pipe';
import { MaterialModule } from '.';

@NgModule({
  declarations:[NamecasePipe],
  imports: [CommonModule,TableLayoutModule , MaterialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,NamecasePipe,TableLayoutModule,MaterialModule]
})
export class SharedModule {}
