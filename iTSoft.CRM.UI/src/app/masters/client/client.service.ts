import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { ClientMaster } from './client.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class ClientService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/client/save";
    searchUrl: string = iTCRMSettings.Masters + "/client/searchclient";
    deleteURL: string = iTCRMSettings.Masters + "/client/delete";
    getClientUrl: string = iTCRMSettings.Masters + "/client/findClient";

    Save(clientMaster: ClientMaster) {

        clientMaster.ClientName = clientMaster.FirstName + " " + clientMaster.MiddleName + " " + clientMaster.LastName;
        clientMaster.ClientName = clientMaster.ClientName.trim();
        
        // if(clientMaster.ClientId < 1)
        // {
        //     clientMaster.AddedBy = this.userService.GetUserId();
        //     clientMaster.AddedDate = new Date(Date.now());
        // }

        // clientMaster.UpdatedBy = this.userService.GetUserId();
        // clientMaster.UpdatedDate = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, clientMaster);
    }

    SearchClient(clientMaster:ClientMaster) {
        return this.apiService.PostData(this.searchUrl,clientMaster);
    }

   
    Delete(ClientId: number) {
        return this.apiService.PostData(this.deleteURL, ClientId);
    }

    FindClient(ClientId: number) {
        return this.apiService.GetData(this.getClientUrl + "?ClientId=" + ClientId);
    }

    NewClient()
    {
        let clientMaster = new ClientMaster();
        clientMaster.ClientId = 0;
        clientMaster.ClientName = null;

        return clientMaster;
    }

}
