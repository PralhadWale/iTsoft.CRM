import { Component, OnInit, ViewChild } from '@angular/core';

import { EmployeeMaster } from './employeeMaster';
import { EmployeeService } from './employee.service';
import { PagerService } from '../_services';
import { ConfirmDialog } from '../shared';
import * as _ from 'lodash';

import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';


@Component({
    selector: 'employee-list',
    templateUrl: './employeeList.component.html',
    styleUrls: ['./employeeList.component.css'],
    providers: [ConfirmDialog]
})
export class EmployeeListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    pageTitle: string = 'Employees';
    imageWidth: number = 30;
    imageMargin: number = 2;
    showImage: boolean = false;
    listFilter: any = {};
    errorMessage: string;

    employees: EmployeeMaster[];
    employeeList: EmployeeMaster[]; //
    displayedColumns = ["Name", "MobileNo1", "EmailId","DepartMent",  "Role" , "TargetAmount" ,"EmployeeId"];
    dataSource: any = null;
    pager: any = {};
    pagedItems: any[];
    searchFilter: any = {
        FirstName: "",
        MiddleName: "",
        EmailId: ""
    };
    selectedOption: string;


    constructor(
        private employeeService: EmployeeService,
        // private pagerService: PagerService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    freshDataList(employees: EmployeeMaster[]) {
        this.employees = employees;

        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    ngOnInit(): void {
        this.employees = [];
        // this.employeeService.getEmployees()
        //     .subscribe(employees => {
        //         this.freshDataList(employees);
        //     },
        //         error => this.errorMessage = <any>error);
let ew = new EmployeeMaster();
ew.EmployeeId = 10;
ew.UpdatedDate = new Date();
ew.FirstName ="Taxblock";
ew.MiddleName = "B";
ew.LastName ="Admin";
ew.MobileNo1 = "00000000";
ew.EmailId = "tb@taxblock.in";
ew.DepartMent = "Admin";
ew.Role = "Admin";
ew.TargetAmount =3456;
this.employees.push(ew);
        this.freshDataList(this.employees);
        this.searchFilter = {};
        this.listFilter = {};
    }

    getEmployees(pageNum?: number) {
        this.employeeService.getEmployees()
            .subscribe(employees => {
                this.freshDataList(employees);
            },
                error => this.errorMessage = <any>error);
    }

    searchEmployees(filters: any) {
        if (filters) {
            this.employeeService.getEmployees()
                .subscribe(employees => {
                    this.employees = employees;
                    console.log(this.employees.length)
                    this.employees = this.employees.filter((employee: EmployeeMaster) => {
                        let match = true;

                        Object.keys(filters).forEach((k) => {
                            match = match && filters[k] ?
                                employee[k].toLocaleLowerCase().indexOf(filters[k].toLocaleLowerCase()) > -1 : match;
                        })
                        return match;
                    });
                    this.freshDataList(employees);
                },
                    error => this.errorMessage = <any>error);
        }

    }

    resetListFilter() {
        this.listFilter = {};
        this.getEmployees();
    }

    reset() {
        this.listFilter = {};
        this.searchFilter = {};
        this.getEmployees();

    }

    resetSearchFilter(searchPanel: any) {
        searchPanel.toggle();
        this.searchFilter = {};
        this.getEmployees();
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 1500,
        });
    }

    openDialog(id: number) {
        let dialogRef = this.dialog.open(ConfirmDialog,
            { data: { title: 'Dialog', message: 'Are you sure to delete this item?' } });
        dialogRef.disableClose = true;


        dialogRef.afterClosed().subscribe(result => {
            this.selectedOption = result;

            if (this.selectedOption === dialogRef.componentInstance.ACTION_CONFIRM) {
                this.employeeService.deleteEmployee(id).subscribe(
                    () => {
                        this.employeeService.getEmployees()
                            .subscribe(employees => {
                                this.freshDataList(employees);
                            },
                                error => this.errorMessage = <any>error);
                        this.openSnackBar("The item has been deleted successfully. ", "Close");
                    },
                    (error: any) => {
                        this.errorMessage = <any>error;
                        console.log(this.errorMessage);
                        this.openSnackBar("This item has not been deleted successfully. Please try again.", "Close");
                    }
                );
            }
        });
    }
}
