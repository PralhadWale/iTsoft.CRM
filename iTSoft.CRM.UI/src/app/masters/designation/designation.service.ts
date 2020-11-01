import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { DesignationMaster } from './designation.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class DesignationService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/designation/save";
    getUrl: string = iTCRMSettings.Masters + "/designation/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/designation/delete";
    getDesignationListUrl: string = iTCRMSettings.Masters + "/designation/findDesignation";

    Save(designationMaster: DesignationMaster) {

        // designationMaster.AddedBy = this.userService.GetUserId();
        // designationMaster.UpdatedBy = this.userService.GetUserId();
        designationMaster.AddedOn = new Date(Date.now());
        designationMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, designationMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(DesignationId: number) {
        return this.apiService.PostData(this.deleteURL, DesignationId);
    }

    FindDesignation(DesignationId: number) {
        return this.apiService.GetData(this.getDesignationListUrl + "?DesignationId=" + DesignationId);
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
