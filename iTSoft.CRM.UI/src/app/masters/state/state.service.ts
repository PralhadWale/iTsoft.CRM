import { Injectable } from '@angular/core';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
import { UserService } from 'src/app/shared/services/UserService';
import { StateMaster } from './state.model';

@Injectable()
export class StateService {
    constructor(private apiService: iTCRMAPIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/State/Save";
    getUrl: string = iTCRMSettings.Masters + "/State/GetAll";
    deleteURL: string = iTCRMSettings.Masters + "/State/Delete";
    getStateListUrl: string = iTCRMSettings.Masters + "/State/FindState";

    Save(stateMaster: StateMaster) {

        if(stateMaster.StateId < 1)
        {
            stateMaster.AddedOn = new Date(Date.now());
            stateMaster.AddedBy = this.userService.GetUserId();
        }
       
        stateMaster.UpdatedOn = new Date(Date.now());
        stateMaster.UpdatedBy = this.userService.GetUserId();

        return this.apiService.POST(this.URLSave, stateMaster);
    }

    GetAll() {
        return this.apiService.POST(this.getUrl, '');
    }

    // Delete(stateMaster: State) {
    //     return this.apiService.POST(this.deleteURL, stateMaster);
    // }
    Delete(StateId: number) {
        return this.apiService.POST(this.deleteURL, StateId);
    }

    FindState(StateId: number) {
        return this.apiService.GETData(this.getStateListUrl + "?StateId=" + StateId);
    }

    NewState()
    {
        let stateMaster = new StateMaster();
        stateMaster.StateId = 0;
        stateMaster.StateName = null;
        stateMaster.IsActive = false;

        return stateMaster;
    }
}
