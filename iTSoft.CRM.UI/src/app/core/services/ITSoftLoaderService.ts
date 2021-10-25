import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { MatSpinner } from '@angular/material';
// import 'hammerjs';

@Injectable()

export class iTCRMLoaderService {
    public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    display(value: boolean) {
        //this.status.next(value);
    }
}