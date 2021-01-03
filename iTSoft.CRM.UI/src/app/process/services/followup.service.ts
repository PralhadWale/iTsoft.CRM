import { Injectable } from '@angular/core';
import { ConfigurationSettings } from 'src/app/_models/configuration';
import { FollowUp } from 'src/app/_models/followup';
import { FollowUpDetails } from 'src/app/_models/followupdetails';
import { FollowUpSerchParameters } from 'src/app/_models/followupserchparameters';
import { APIService } from 'src/app/_services';

@Injectable({
  providedIn: 'root'
})
export class FollowupService {
 
  private followUpController = "/FollowUp/";
  constructor(private apiService: APIService) {

  }

  Save(followUp: FollowUp) {
    followUp.AddedBy = 1;
    followUp.AddedOn = new Date();
    let url = this.followUpController + "save";
    return this.apiService.PostData(url, followUp);
  }

  Search(param: FollowUpSerchParameters) {
    let url = this.followUpController + "search";
    return this.apiService.PostData(url, param);
  }

  Assign(followUpDetails: FollowUpDetails) {
    let param = {
      AdvisorId:followUpDetails.AdvisorId,
      TransferWithRequest:followUpDetails.TransferWithRequest,
      FollowUpId : followUpDetails.FollowUpId,
      UpdatedBy : ConfigurationSettings.User.UserId
    };
    let url = this.followUpController + "assign";
    return this.apiService.PostData(url, param);
  }
}
