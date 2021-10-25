import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/services/UserService';
import { APIService } from 'src/app/_services';

import { EmailMaster } from './email.model';
import { iTCRMSettings } from 'src/app/core/models/iTSOFT.iTCRM.Configuration';

@Injectable() 
export class EmailService {
    constructor(private apiService: APIService, private userService: UserService) { }

    URLSave: string = iTCRMSettings.Masters + "/email/save";
    getUrl: string = iTCRMSettings.Masters + "/email/list";
    deleteURL: string = iTCRMSettings.Masters + "/email/delete";
    getEmailListUrl: string = iTCRMSettings.Masters + "/email/findEmail";

    Save(emailMaster: EmailMaster) {

        if(emailMaster.EmailId < 1)
        {
            emailMaster.AddedBy = this.userService.GetUserId();
            emailMaster.AddedDate = new Date(Date.now());
        }

        emailMaster.UpdatedBy = this.userService.GetUserId();
        emailMaster.UpdatedDate = new Date(Date.now());

        return this.apiService.PostData(this.URLSave, emailMaster);
    }

    GetAll() {
        return this.apiService.GetData(this.getUrl);
    }

   
    Delete(record: EmailMaster) {
        return this.apiService.PostData(this.deleteURL, record);
    }

    FindEmail(EmailId: number) {
        return this.apiService.GetData(this.getEmailListUrl + "?EmailId=" + EmailId);
    }

    NewEmail()
    {
        let emailMaster = new EmailMaster();
        emailMaster.EmailId = 0;
        emailMaster.Email = null;
        emailMaster.SMTPSettingId = 1;

        return emailMaster;
    }

}
