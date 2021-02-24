import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { DepartmentMaster } from './department.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class DepartmentService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/department/save";
    getUrl: string = iTCRMSettings.Masters + "/department/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/department/delete";
    getDepartmentListUrl: string = iTCRMSettings.Masters + "/department/findDepartment";

    Save(departmentMaster: DepartmentMaster) {

        if(departmentMaster.DepartmentId < 1)
        {
            departmentMaster.AddedBy = this.userService.GetUserId();
            departmentMaster.AddedOn = new Date(Date.now());
        }

        departmentMaster.UpdatedBy = this.userService.GetUserId();
        departmentMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, departmentMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(record: DepartmentMaster) {
        return this.apiService.PostData(this.deleteURL, record);
    }

    FindDepartment(DepartmentId: number) {
        return this.apiService.GetData(this.getDepartmentListUrl + "?DepartmentId=" + DepartmentId);
    }

    NewDepartment()
    {
        let departmentMaster = new DepartmentMaster();
        departmentMaster.DepartmentId = 0;
        departmentMaster.DepartmentName = null;
        departmentMaster.IsActive = false;

        return departmentMaster;
    }

}
