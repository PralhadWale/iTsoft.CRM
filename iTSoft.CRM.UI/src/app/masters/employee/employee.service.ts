 

import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { EmployeeDetails, EmployeeMaster } from './employeeMaster.model';
import { DepartmentMaster } from '../department/department.model';
import { ListModel } from 'src/app/_models/listmodel';

@Injectable() 
export class EmployeeService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/employee/save";
    getUrl: string = iTCRMSettings.Masters + "/employee/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/employee/delete";
    findURL: string = iTCRMSettings.Masters + "/employee/find";
    getemployeeinfoURL : string =  iTCRMSettings.Masters + "/employee/getemployeeinfo";

    GetEmployeeInfo(employee: EmployeeMaster) {
        return this.apiService.PostData(this.getemployeeinfoURL, employee);
    }

    Save(employee: EmployeeMaster , selectedDepartments : Array<ListModel>) {

        employee.AddedBy = this.userService.GetUserId();
        employee.UpdatedBy = this.userService.GetUserId();
        employee.AddedDate = new Date(Date.now());
        employee.UpdatedDate = new Date(Date.now());

        let departments: Array<any> = [];
        selectedDepartments.forEach((x) => {
            departments.push ({ DepartmentId: x.Value });
        });

        let employeeDetails : EmployeeDetails = new EmployeeDetails();
        employeeDetails.EmployeeMaster= employee;
        employeeDetails.DepartmentMasters = departments;

        return this.apiService.PostData(this.URLSave, employeeDetails);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(employee: EmployeeMaster) {
        return this.apiService.PostData(this.deleteURL, employee);
    }

    Find(employeeId: number) {
        return this.apiService.GetData(this.findURL + "?employeeId=" + employeeId);
    }


    initializeEmployee(): EmployeeMaster {
        // Return an initialized object
        return {
            EmployeeId: 0,
            FirstName: null,
            MiddleName: null,
            LastName: null,
            MobileNo1: null,
            MobileNo2: null,
            EmailId: null,
            Address1: null,
            Address2: null,
            PostalCode: null,
            AadharNo: null,
            UniqueID: null,
            LoginName: null,
            Password: null,
            IsActive: false,
            Role: null,
            Designation:null,
            RoleId: 0,
            DesignationId:0,
            DepartmentId:0,
            AddedBy: 0,
            UpdatedBy: 0,
            TargetAmount:0,
            AddedDate: null,
            UpdatedDate: null
        };
    }
}
