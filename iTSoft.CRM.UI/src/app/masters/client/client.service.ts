import { Injectable } from '@angular/core';

import { APIService } from 'src/app/_services';

import { ClientMaster } from './client.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { ClientViewModel } from 'src/app/_models/clientViewModel';
import { UserProfilService } from 'src/app/_services/userProfile.Service';

@Injectable() 
export class ClientService {
    constructor(private apiService: APIService, private userProfileService: UserProfilService) { }

    URLSave: string = iTCRMSettings.Masters + "/client/save";
    searchUrl: string = iTCRMSettings.Masters + "/client/searchclient";
    deleteURL: string = iTCRMSettings.Masters + "/client/delete";
    getClientUrl: string = iTCRMSettings.Masters + "/client/findClient";

    Save(clientViewModel: ClientViewModel) {

    
        clientViewModel.ClientMaster.AddedBy = this.userProfileService.CurrentUser.UserId;
        clientViewModel.ClientMaster.AddedOn = new Date();
        clientViewModel.ClientMaster.UpdatedBy = this.userProfileService.CurrentUser.UserId;
        clientViewModel.ClientMaster.UpdatedOn = new Date();



    clientViewModel.ContactPersonMasters = [];
    clientViewModel.ContactPersonMasters.push(clientViewModel.ContactPersonMaster);

        return this.apiService.PostData(this.URLSave, clientViewModel);
    }

    SearchClient(clientMaster:ClientMaster) {
        return this.apiService.PostData(this.searchUrl,clientMaster);
    }

   
    Delete(ClientId: number) {
        return this.apiService.PostData(this.deleteURL, ClientId);
    }

    FindClient(ClientId: number) {
        return this.apiService.GetData(this.getClientUrl + "?clientId=" + ClientId);
    }

    NewClient()
    {
        let clientMaster = new ClientMaster();
        clientMaster.ClientId = 0;
        clientMaster.ClientName = null;

        return clientMaster;
    }

}
