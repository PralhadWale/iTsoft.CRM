import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmDialog } from '../../shared';
import * as _ from 'lodash';

import { CommandEventArgs, CommandModel, CommandType, TableColumnModel, TableDefaultSettings, ToolBarItems } from '../../shared/table-layout/it-mat-table.component';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { EmployeeService } from './employee.service';
import { AlertService } from '../../_services';
import { EmployeeMaster } from './employeeMaster.model';
import { NgForm } from '@angular/forms/';


@Component({
    selector: 'employee-list',
    templateUrl: './employeeList.component.html',
    styleUrls: ['./employeeList.component.css'],
    providers: [ConfirmDialog]
})
export class EmployeeListComponent implements OnInit {
    @ViewChild("sidenav") sidenav: MatSidenav;
    @ViewChild("employeeForm") employeeForm: NgForm;
    pageTitle: string = 'Employees';

    searchFilter: EmployeeMaster = new EmployeeMaster();


    employeeList: Array<any>;
    employeeTableSchema: Array<TableColumnModel> = [];
    tableSettings: TableDefaultSettings;

    constructor(
        private employeeService: EmployeeService,
        private alertService: AlertService,
        private router: Router,

    ) {

    }
    ngOnInit(): void {
        this.SetTableSchema();
        this.getEmployeeList();
    }



    onCommandClick($event: CommandEventArgs) {

        if (!$event.toolbarItem) {
            if ($event.command.commandType == CommandType.Edit) {
                let rowData: EmployeeMaster = Object.assign({}, $event.rowData);
                this.router.navigate(['/employees/edit/', rowData.EmployeeId]);
            }
        

        }
        else {
            if ($event.toolbarItem == ToolBarItems.Add) {
                this.router.navigate(['/employees/edit/', 0]);
            }
            else if ($event.toolbarItem == ToolBarItems.Search) {
                this.sidenav.toggle();
            }
            else if ($event.toolbarItem == ToolBarItems.Refresh) {
                this.getEmployeeList();
            }
        }

    }

    resetSearchFilter(sidenav: any) {
        this.searchFilter = new EmployeeMaster();
        this.sidenav.close();
    }

    searchEmployees(searchFilter: any) {
        if (this.employeeForm && this.employeeForm.valid) {
            this.getEmployeeList();
        }
    }

    getEmployeeList() {

        this.employeeService.GetEmployeeInfo(this.searchFilter).subscribe(result => {
            this.employeeList = result.Value.ResponseData;
            this.sidenav.close();
        }, error => { this.alertService.showErrorMessage(error.error); });

    }

    SetTableSchema() {
        this.tableSettings = new TableDefaultSettings();
        this.tableSettings.ShowToolBar = true;
        this.tableSettings.ToolBarItems = [ToolBarItems.Add, ToolBarItems.Refresh, ToolBarItems.Search];

        let gridCommands: Array<CommandModel> = [
            { commandType: CommandType.Edit }  
        
        ];

        this.employeeTableSchema =
            [
                { ColumnField: "FirstName", ColumnHeader: "First Name", Type: "text" },
                { ColumnField: "MiddleName", ColumnHeader: "Middle Name", Type: "text" },
                { ColumnField: "LastName", ColumnHeader: "Last Name", Type: "text" },
                { ColumnField: "MobileNo1", ColumnHeader: "Mobile No 1", Type: "text" },
                { ColumnField: "EmailId", ColumnHeader: "Email", Type: "text" },
                { ColumnField: "LoginName", ColumnHeader: "Login Name", Type: "text" },
                { ColumnField: "Designation", ColumnHeader: "Designation", Type: "text" },
                { ColumnField: "Department", ColumnHeader: "Department", Type: "text" },
                { ColumnField: "Email", ColumnHeader: "Assigned Mails", Type: "text" },
                { ColumnField: "Role", ColumnHeader: "Role", Type: "text" },
                { ColumnField: "IsActive", ColumnHeader: "Is Active", Type: "boolean" },
                { ColumnField: "$$edit", ColumnHeader: "", Type: "text", Command: gridCommands }
            ];
    }

}
