import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { DesignationMaster } from './designation.model';

@Injectable() 
export class DesignationService {
    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Designation/Save";
    getUrl: string = iTCRMSettings.Masters + "/Designation/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Designation/Delete";
    getDesignationListUrl: string = iTCRMSettings.Masters + "/Designation/FindDesignation";

    Save(designationMaster: DesignationMaster) {

        // designationMaster.AddedBy = this.userService.GetUserId();
        // designationMaster.UpdatedBy = this.userService.GetUserId();
        designationMaster.AddedOn = new Date(Date.now());
        designationMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.POST(this.URLSave, designationMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(designationMaster: Designation) {
    //     return this.apiService.POST(this.deleteURL, designationMaster);
    // }
    Delete(DesignationId: number) {
        return this.apiService.POST(this.deleteURL, DesignationId);
    }

    FindDesignation(DesignationId: number) {
        return this.apiService.GETData(this.getDesignationListUrl + "?DesignationId=" + DesignationId);
    }

    NewDesignation()
    {
        let designationMaster = new DesignationMaster();
        designationMaster.DesignationId = 0;
        designationMaster.DesignationName = null;
        designationMaster.IsActive = false;

        return designationMaster;
    }

}
