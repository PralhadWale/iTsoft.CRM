import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({ providedIn: 'root' })
export class iTCRMAlertService {
    public toast: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor(private router: Router) { }

    ShowInfoMessage(message: any) { this.addToast({ title: 'iTCRM Info', content: message, cssClass: 'e-toast-info', icon: 'e-info toast-icons' }) }
    ShowSuccessMessage(message: string, action?: string) { this.addToast({ title: 'iTCRM Success', content: message, cssClass: 'e-toast-success', icon: 'e-success toast-icons' }) }
    ShowWarningMessage(message: any, action?: string) { this.addToast({ title: 'iTCRM Warning', content: message, cssClass: 'e-toast-warning', icon: 'e-warning toast-icons' }) }
    ShowErrorMessage(message: any, action?: string) { this.addToast({ title: 'iTCRM Error', content: message, cssClass: 'e-toast-danger', icon: 'e-error toast-icons' }) }
    addToast(options: any) {
        this.toast.next(options);
    }
    NavigateToRoute(route: string) {
        this.router.navigate([route]);
    }
}
