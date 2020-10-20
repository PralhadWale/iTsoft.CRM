import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { SourceMaster } from './source.model';

@Injectable()
export class SourceService {

    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Source/Save";
    getUrl: string = iTCRMSettings.Masters + "/Source/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Source/Delete";
    getSourceListUrl: string = iTCRMSettings.Masters + "/Source/FindSource";

    Save(sourceMaster: SourceMaster) {

        // sourceMaster.AddedBy = this.userService.GetUserId();
        // sourceMaster.UpdatedBy = this.userService.GetUserId();
        sourceMaster.AddedOn = new Date(Date.now());
        sourceMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.POST(this.URLSave, sourceMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(sourceMaster: Source) {
    //     return this.apiService.POST(this.deleteURL, sourceMaster);
    // }
    Delete(SourceId: number) {
        return this.apiService.POST(this.deleteURL, SourceId);
    }

    FindSource(SourceId: number) {
        return this.apiService.GETData(this.getSourceListUrl + "?SourceId=" + SourceId);
    }

    NewSource()
    {
        let sourceMaster = new SourceMaster();
        sourceMaster.SourceId = 0;
        sourceMaster.SourceName = null;
        sourceMaster.IsActive = false;

        return sourceMaster;
    }
}
