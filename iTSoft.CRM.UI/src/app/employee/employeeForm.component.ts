import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeMaster } from './employeeMaster';
import { EmployeeService } from './employee.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


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

    pageTitle: string = 'Update Employee';
    errorMessage: string;
    employeeForm: FormGroup;
    employee: EmployeeMaster = <EmployeeMaster>{};
    private sub: Subscription;
    showImage: boolean;
    imageWidth: number = 100;
    imageMargin: number = 2;
    fieldColspan = 3;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private genericValidator: GenericValidator;

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    private validationMessages: { [key: string]: { [key: string]: string } | {} } = {
        firstname: {
            required: 'Employee first name is required.',
            minlength: 'Employee first name must be at least one characters.',
            maxlength: 'Employee first name cannot exceed 100 characters.'
        },
        lastname: {
            required: 'Employee last name is required.',
            minlength: 'Employee last name must be at least one characters.',
            maxlength: 'Employee last name cannot exceed 100 characters.'
        },
        email: {
            required: 'Employee email is required.',
            minlength: 'Employee email must be at least one characters.',
            maxlength: 'Employee email cannot exceed 200 characters.'
        },
        rewards: {
            range: 'Rewards of the employee must be between 0 (lowest) and 150 (highest).'
        },
        phone: { maxlength: 'Employee phone cannot exceed 12 characters.' },
        mobile: { maxlength: 'Employee mobile cannot exceed 12 characters.' },
    };

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private breakpointObserver: BreakpointObserver
    ) {
        breakpointObserver.observe([
            Breakpoints.HandsetLandscape,
            Breakpoints.HandsetPortrait
        ]).subscribe(result => {
            // console.log(result)
            this.onScreensizeChange(result);
        });
        this.genericValidator = new GenericValidator(this.validationMessages);

    }

    ngOnInit(): void {
        this.employeeForm = this.fb.group({
            EmployeeId: [''],
            FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            MiddleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
            MobileNo1: ['', Validators.maxLength(10)],
            MobileNo2: ['', Validators.maxLength(10)],
            EmailId: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
            Address1: [''],
            Address2: [''],
            PostalCode: [''],
            TargetAmount: [''],
            UniqueID: [''],
            LoginName: [''],
            Password: ['']
        });

        // Read the employee Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getEmployee(id);
            }
        );

        this.sub.add(null);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.employeeForm.valueChanges, ...controlBlurs).debounceTime(500).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.employeeForm);
        });
    }

    getEmployee(id: number): void {
        this.employeeService.getEmployee(id)
            .subscribe(
                (employee: EmployeeMaster) => this.onEmployeeRetrieved(employee),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onEmployeeRetrieved(employee: EmployeeMaster): void {
        if (this.employeeForm) {
            this.employeeForm.reset();
        }
        this.employee = employee;

        if (this.employee.EmployeeId === 0) {
            this.pageTitle = 'New Employee';
        } else {
            this.pageTitle = `Employee: ${this.employee.FirstName} ${this.employee.LastName}`;
        }

        // Update the data on the form
        this.employeeForm.patchValue({
            EmployeeId: this.employee.EmployeeId,
            FirstName: this.employee.FirstName,
            MiddleName: this.employee.MiddleName,
            LastName: this.employee.LastName,
            MobileNo1: this.employee.MobileNo1,
            MobileNo2: this.employee.MobileNo2,
            EmailId: this.employee.EmailId,
            Address1: this.employee.Address1,
            Address2: this.employee.Address2,
            PostalCode: this.employee.PostalCode,
            AadharNo: this.employee.AadharNo,
            UniqueID: this.employee.UniqueID,
            LoginName: this.employee.LoginName,
            Password: this.employee.Password
        });
    }

    deleteEmployee(): void {
        if (this.employee.EmployeeId === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the employee: ${this.employee.FirstName}?`)) {
                this.employeeService.deleteEmployee(this.employee.EmployeeId)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    toggleImage(): void {
        event.preventDefault();
        this.showImage = !this.showImage;
    }


    saveEmployee(): void {
        if (this.employeeForm.dirty && this.employeeForm.valid) {
            // Copy the form values over the employee object values
            const employee = Object.assign({}, this.employee, this.employeeForm.value);

            this.employeeService.saveEmployee(employee)
                .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.employeeForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.employeeForm.reset();
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
