import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName, MaxLengthValidator, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { EmployeeService } from './employee.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { EmployeeDetails, EmployeeMaster } from './employeeMaster.model';
import { AlertService } from '../../_services';
import { EmployeeSelectListModel } from '../../_models/employeeSelectListModel';
import { ListService } from '../../process/services/list.service';
import { ListModel } from 'src/app/_models/listmodel';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/shared';


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

    employeeSelectList : EmployeeSelectListModel = new EmployeeSelectListModel();
    selectedDepartments : Array<ListModel> = [];

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private listService: ListService,
        private employeeService: EmployeeService,
        private breakpointObserver: BreakpointObserver,
        public dialog: MatDialog,
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
        this.LoadSelectListData();
   }

    ngOnDestroy(): void {

    }

    ngAfterViewInit(): void {

    }

    Close(employeeForm:NgForm)
    {
        if (employeeForm.touched) {

            let dialogData = { title: "Confirm Action", message: "Are you sure ? Do you really want to cancel editing ? " };
            const dialogRef = this.dialog.open(ConfirmDialog, {
                maxWidth: "400px",
                data: dialogData
            });

            dialogRef.afterClosed().subscribe(dialogResult => {
                let result = dialogResult;
                if (result == "CONFIRMED") {
                    this.router.navigate(['/employees']);
                }
            }
            );
        }
        else 
        {
            this.router.navigate(['/employees']);
        }
    }

    LoadSelectListData() {
        this.listService
          .GetEmployeeSelectList()
          .subscribe(
            (result) => {
              this.employeeSelectList = <EmployeeSelectListModel>result.Value.ResponseData;
            },
    
          ).add(()=> { 
            // Read the employee Id from the route parameter
            this.route.params.subscribe(
                params => {
                    let id = +params['id'];
                    this.getEmployee(id);
                }
            );});
      }

    getEmployee(id: number): void {
        this.employeeService.Find(id)
            .subscribe(
                (result) => this.onEmployeeRetrieved(result.Value.ResponseData),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onEmployeeRetrieved(employeeDetails: EmployeeDetails): void {
        this.selectedDepartments = [];
        if (employeeDetails != null) {
            this.employee = employeeDetails.EmployeeMaster;
            employeeDetails.DepartmentMasters.forEach((x) => {
                let department = this.employeeSelectList.Departments.filter( y=> y.Value == x.DepartmentId);
                if(department && department.length > 0)
                {
                    this.selectedDepartments.push(department[0]);
                }
            });
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
        if (employeeForm && employeeForm.valid) {
            if (this.selectedDepartments && this.selectedDepartments.length > 0) {
                // Copy the form values over the employee object values
                const employee = Object.assign({}, this.employee, employeeForm.value);

                this.employeeService.Save(employee , this.selectedDepartments)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) =>
                        {
                             this.errorMessage = <any>error
                             this.alertService.showErrorMessage("Failed to save");
                        }

                    );
            }
            else {
                this.alertService.showErrorMessage("Please assign at least one department");
            }
        }
      
    }

    onSaveComplete(): void {
        this.alertService.showSuccessMessage("Employee saved successfully");
        this.router.navigate(['/employees']);
    }

    onDepartmentSelectionChange($event)
    {
        console.log($event);
        console.log(this.selectedDepartments);
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
