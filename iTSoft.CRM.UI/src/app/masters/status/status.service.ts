import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { StatusMaster } from './status.model';

@Injectable()
export class StatusService {
    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Status/Save";
    getUrl: string = iTCRMSettings.Masters + "/Status/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Status/Delete";
    getStatusListUrl: string = iTCRMSettings.Masters + "/Status/FindStatus";

    Save(statusMaster: StatusMaster) {

        // statusMaster.AddedBy = this.userService.GetUserId();
        // statusMaster.UpdatedBy = this.userService.GetUserId();
        statusMaster.AddedOn = new Date(Date.now());
        statusMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.POST(this.URLSave, statusMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(statusMaster: Status) {
    //     return this.apiService.POST(this.deleteURL, statusMaster);
    // }
    Delete(StatusId: number) {
        return this.apiService.POST(this.deleteURL, StatusId);
    }

    FindStatus(StatusId: number) {
        return this.apiService.GETData(this.getStatusListUrl + "?StatusId=" + StatusId);
    }

    NewStatus()
    {
        let statusMaster = new StatusMaster();
        statusMaster.StatusId = 0;
        statusMaster.StatusName = null;
        statusMaster.IsActive = false;

        return statusMaster;
    }

}
