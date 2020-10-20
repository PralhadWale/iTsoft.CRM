import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { ServiceMaster } from './service.model';

@Injectable()
export class ServiceService {

    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/Service/Save";
    getUrl: string = iTCRMSettings.Masters + "/Service/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/Service/Delete";
    getServiceListUrl: string = iTCRMSettings.Masters + "/Service/FindService";

    Save(serviceMaster: ServiceMaster) {

        // serviceMaster.AddedBy = this.userService.GetUserId();
        // serviceMaster.UpdatedBy = this.userService.GetUserId();
        serviceMaster.AddedOn = new Date(Date.now());
        serviceMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.POST(this.URLSave, serviceMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }
    Delete(ServiceId: number) {
        return this.apiService.POST(this.deleteURL, ServiceId);
    }

    FindService(ServiceId: number) {
        return this.apiService.GETData(this.getServiceListUrl + "?ServiceId=" + ServiceId);
    }

    NewService()
    {
        let serviceMaster = new ServiceMaster();
        serviceMaster.ServiceId = 0;
        serviceMaster.ServiceName = null;
        serviceMaster.IsActive = false;

        return serviceMaster;
    }


}
