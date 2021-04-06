 

import { Injectable } from '@angular/core';
import { APIService } from 'src/app/_services';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { EmployeeDetails, EmployeeMaster } from './employeeMaster.model';
import { ListModel } from 'src/app/_models/listmodel';
import { UserProfilService } from 'src/app/_services/userProfile.Service';

@Injectable() 
export class EmployeeService {
    constructor(private apiService: APIService, private userService: UserProfilService) { }

    URLSave: string = iTCRMSettings.Masters + "/employee/save";
    getUrl: string = iTCRMSettings.Masters + "/employee/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/employee/delete";
    findURL: string = iTCRMSettings.Masters + "/employee/find";
    getemployeeinfoURL : string =  iTCRMSettings.Masters + "/employee/getemployeeinfo";

    GetEmployeeInfo(employee: EmployeeMaster) {

        employee.RoleId = this.userService.CurrentUser.RoleId;
        employee.AddedBy = this.userService.CurrentUser.UserId;

        return this.apiService.PostData(this.getemployeeinfoURL, employee);
    }

    Save(employee: EmployeeMaster , selectedDepartments : Array<ListModel>) {

        employee.AddedBy = this.userService.CurrentUser.UserId;
        employee.UpdatedBy = this.userService.CurrentUser.UserId;
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
            RoleId: null,
            DesignationId:null,
            DepartmentId:null,
            AddedBy: null,
            UpdatedBy: null,
            TargetAmount:null,
            AddedDate: null,
            UpdatedDate: null
        };
    }
}
