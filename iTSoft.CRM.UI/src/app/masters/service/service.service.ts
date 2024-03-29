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
    searchServiceURL :string = iTCRMSettings.Masters + "/service/search-services";
    getDepartmentUrl: string = iTCRMSettings.Masters + "/department/getAll";
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

    GetAllDepartments() {
        return this.apiService.GetData(this.getDepartmentUrl);
    }

    Delete(serviceMaster: ServiceMaster) {
        return this.apiService.PostData(this.deleteURL, serviceMaster);
    }

    FindService(ServiceId: number) {
        return this.apiService.GetData(this.getServiceListUrl + "?ServiceId=" + ServiceId);
    }

    SearchService(serviceMaster: ServiceMaster) {
        return this.apiService.PostData(this.searchServiceURL ,serviceMaster);
    }

    NewService()
    {
        let serviceMaster = new ServiceMaster();
        serviceMaster.ServiceId = 0;
        serviceMaster.ServiceName = null;
        serviceMaster.Price = 0;
        serviceMaster.IsActive = false;
        serviceMaster.DepartmentId = 0;
        return serviceMaster;
    }


}
