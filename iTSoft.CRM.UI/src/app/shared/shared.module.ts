import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableLayoutModule } from './table-layout/table-layout.module';
import { NamecasePipe } from './pipes/namecase/namecase.pipe';
import { MaterialModule } from '.';
import { CardComponent } from "./card/card.component";
import { MiniCardComponent } from "./mini-card/mini-card.component";

@NgModule({
  declarations:[NamecasePipe , CardComponent,MiniCardComponent],
  imports: [CommonModule,TableLayoutModule , MaterialModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule,NamecasePipe,TableLayoutModule,MaterialModule,CardComponent,MiniCardComponent]
})
export class SharedModule {}
