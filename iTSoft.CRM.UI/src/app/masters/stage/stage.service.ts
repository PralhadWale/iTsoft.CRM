import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { StageMaster } from './stage.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class StageService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/stage/save";
    getUrl: string = iTCRMSettings.Masters + "/stage/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/stage/delete";
    getStageListUrl: string = iTCRMSettings.Masters + "/stage/findStage";

    Save(stageMaster: StageMaster) {

        // stageMaster.AddedBy = this.userService.GetUserId();
        // stageMaster.UpdatedBy = this.userService.GetUserId();
        stageMaster.AddedOn = new Date(Date.now());
        stageMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, stageMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(StageId: number) {
        return this.apiService.PostData(this.deleteURL, StageId);
    }

    FindStage(StageId: number) {
        return this.apiService.GetData(this.getStageListUrl + "?StageId=" + StageId);
    }

    NewStage()
    {
        let stageMaster = new StageMaster();
        stageMaster.StageId = 0;
        stageMaster.StageName = null;
        stageMaster.IsActive = false;

        return stageMaster;
    }

}
