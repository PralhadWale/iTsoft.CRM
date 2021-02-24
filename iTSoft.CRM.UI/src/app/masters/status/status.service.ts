import { Injectable } from '@angular/core';

import { APIService } from 'src/app/_services';
import { UserService } from 'src/app/shared/services/UserService';

import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { StatusMaster } from './status.model';

@Injectable()
export class StatusService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/leadstatus/save";
    getUrl: string = iTCRMSettings.Masters + "/leadstatus/getAll";
    deleteURL: string = iTCRMSettings.Masters + "/leadstatus/delete";
    getStatusListUrl: string = iTCRMSettings.Masters + "/leadstatus/findStatus";

    Save(statusMaster: StatusMaster) {

        if(statusMaster.LeadStatusId < 1)
        {
            statusMaster.AddedBy = this.userService.GetUserId();
            statusMaster.AddedOn = new Date(Date.now());
        }
        
         statusMaster.UpdatedBy = this.userService.GetUserId();
         statusMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, statusMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

    Delete(statusMaster: StatusMaster) {
        return this.apiService.PostData(this.deleteURL, statusMaster);
    }
   

    FindStatus(StatusId: number) {
        return this.apiService.GetData(this.getStatusListUrl + "?StatusId=" + StatusId);
    }

    NewStatus()
    {
        let statusMaster = new StatusMaster();
        statusMaster.LeadStatusId = 0;
        statusMaster.LeadStatusName = null;
        statusMaster.IsActive = false;

        return statusMaster;
    }

}
