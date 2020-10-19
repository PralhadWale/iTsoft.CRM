import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { NavService } from './services/nav.service';
import { MaterialModule } from '../shared';

@NgModule({
    declarations: [MenuListItemComponent],
    imports: [CommonModule,MaterialModule],
    exports: [MenuListItemComponent],
    providers:[NavService]
})
export class NavLayoutModule { }
