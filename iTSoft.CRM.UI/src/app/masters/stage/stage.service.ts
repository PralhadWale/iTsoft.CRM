import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { StageMaster } from './stage.model';

@Injectable()
export class StageService {
    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Stage/Save";
    getUrl: string = iTCRMSettings.Masters + "/Stage/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Stage/Delete";
    getStageListUrl: string = iTCRMSettings.Masters + "/Stage/FindStage";

    Save(stageMaster: StageMaster) {

        // stageMaster.AddedBy = this.userService.GetUserId();
        // stageMaster.UpdatedBy = this.userService.GetUserId();
        stageMaster.AddedOn = new Date(Date.now());
        stageMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.POST(this.URLSave, stageMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(stageMaster: Stage) {
    //     return this.apiService.POST(this.deleteURL, stageMaster);
    // }
    Delete(StageId: number) {
        return this.apiService.POST(this.deleteURL, StageId);
    }

    FindStage(StageId: number) {
        return this.apiService.GETData(this.getStageListUrl + "?StageId=" + StageId);
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
