import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableLayoutModule } from './table-layout/table-layout.module';
import { NamecasePipe } from './pipes/namecase/namecase.pipe';

@NgModule({
  declarations:[NamecasePipe],
  imports: [CommonModule,TableLayoutModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,NamecasePipe,TableLayoutModule]
})
export class SharedModule {}
