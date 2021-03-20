import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })

export class AlertService {
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(private router: Router,
        private _snackBar: MatSnackBar) {
    }

    showInfoMessage(message: any , duration : number = 2000) {
        this._snackBar.open(message, '', {
            duration: duration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'snackbar-info-class',
        });
    }

    showSuccessMessage(message: any) {
        this._snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'snackbar-success-class'
        });
    }

    showWarningMessage(message: any) {
        this._snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'snackbar-warning-class'
        });
    }

    showErrorMessage(message: any) {
        this._snackBar.open(message, '', {
            duration: 2000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'snackbar-error-class'
        });
    }
}
