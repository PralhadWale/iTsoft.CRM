import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';
import { ServiceMaster } from './service.model';

@Injectable()
export class ServiceService {

    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/service/save";
    getUrl: string = iTCRMSettings.Masters + "/service/getall";
    deleteURL: string = iTCRMSettings.Masters + "/service/delete";
    getServiceListUrl: string = iTCRMSettings.Masters + "/service/findservice";

    Save(serviceMaster: ServiceMaster) {

        if(serviceMaster.ServiceId < 1)
        {
            serviceMaster.AddedBy = this.userService.GetUserId();
            serviceMaster.AddedOn = new Date(Date.now());
        }

        serviceMaster.UpdatedBy = this.userService.GetUserId();
        serviceMaster.UpdatedOn = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, serviceMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }
    Delete(ServiceId: number) {
        return this.apiService.PostData(this.deleteURL, ServiceId);
    }

    FindService(ServiceId: number) {
        return this.apiService.GetData(this.getServiceListUrl + "?ServiceId=" + ServiceId);
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
