import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { SourceMaster } from './source.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class SourceService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/leadsource/save";
    getUrl: string = iTCRMSettings.Masters + "/leadsource/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/leadsource/delete";
    getSourceListUrl: string = iTCRMSettings.Masters + "/leadsource/findSource";

    Save(sourceMaster: SourceMaster) {

        // sourceMaster.AddedBy = this.userService.GetUserId();
        // sourceMaster.UpdatedBy = this.userService.GetUserId();
        sourceMaster.AddedOn = new Date(Date.now());
        sourceMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, sourceMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(SourceId: number) {
        return this.apiService.PostData(this.deleteURL, SourceId);
    }

    FindSource(SourceId: number) {
        return this.apiService.GetData(this.getSourceListUrl + "?SourceId=" + SourceId);
    }

    NewSource()
    {
        let sourceMaster = new SourceMaster();
        sourceMaster.LeadSourceId = 0;
        sourceMaster.LeadSourceName = null;
        sourceMaster.IsActive = false;

        return sourceMaster;
    }

}
