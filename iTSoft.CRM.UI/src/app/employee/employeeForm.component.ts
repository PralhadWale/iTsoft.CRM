import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeService } from './employee.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EmployeeMaster } from './employeeMaster.model';
import { AlertService } from '../_services';


@Component({
    selector: 'employee-form',
    templateUrl: './employeeform.component.html',
    styles: [`
    .title-spacer {
        flex: 1 1 auto;
      }
    .form-field{
        width: 100%;
        margin-left: 20px;
        margin-right: 20px;
    }
    .avatar-field {
        left: 0;
        margin: 0 auto;
        position: absolute;
        margin-left: 50px;
    }
    `]
})
export class EmployeeFormComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    @ViewChild("employeeForm") employeeForm : FormGroup ;

    pageTitle: string = 'Update Employee';
    errorMessage: string;
    employee: EmployeeMaster = <EmployeeMaster>{};
    fieldColspan: number = 4;


    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private employeeService: EmployeeService,
        private breakpointObserver: BreakpointObserver
    ) {

        this.employee = this.employeeService.initializeEmployee();
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            // console.log(result)
            this.onScreensizeChange(result);
        });


    }

    ngOnInit(): void {

        // Read the employee Id from the route parameter
        this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getEmployee(id);
            }
        );


    }

    ngOnDestroy(): void {

    }

    ngAfterViewInit(): void {

    }

    getEmployee(id: number): void {
        this.employeeService.Find(id)
            .subscribe(
                (result) => this.onEmployeeRetrieved(result.Value.ResponseData),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onEmployeeRetrieved(employee: EmployeeMaster): void {
        if (employee != null) {
            this.employee = employee;
        }

        if (this.employee.EmployeeId === 0) {
            this.pageTitle = 'New Employee';
        } else {
            this.pageTitle = `Employee: ${this.employee.FirstName} ${this.employee.LastName}`;
        }


    }

    deleteEmployee(): void {
        if (this.employee.EmployeeId === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the employee: ${this.employee.FirstName}?`)) {
                this.employeeService.Delete(this.employee).subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error);
            }
        }
    }

    saveEmployee(employeeForm: NgForm): void {
        if (employeeForm.dirty && employeeForm.valid) {
            // Copy the form values over the employee object values
            const employee = Object.assign({}, this.employee, employeeForm.value);

            this.employeeService.Save(employee)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        }
        else if (!employeeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        this.router.navigate(['/employees']);
    }

    onScreensizeChange(result: any) {
        // debugger
        const isLess600 = this.breakpointObserver.isMatched('(max-width: 599px)');
        const isLess1000 = this.breakpointObserver.isMatched('(max-width: 959px)');
        console.log(
            ` isLess600  ${isLess600} 
            isLess1000 ${isLess1000}  `
        )
        if (isLess1000) {
            if (isLess600) {
                this.fieldColspan = 12;
            }
            else {
                this.fieldColspan = 6;
            }
        }
        else {
            this.fieldColspan = 3;
        }
    }
}
