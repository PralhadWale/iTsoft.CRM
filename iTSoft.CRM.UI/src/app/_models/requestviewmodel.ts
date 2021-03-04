import { FollowUpDetails } from './followupdetails';
import { RequestMaster } from './request';
import { RequestServiceDetails, RequestServiceMaster } from './requestservice';


export class RequestViewModel
{
    RequestMaster: RequestMaster;
    RequestServiceMasters: RequestServiceMaster[];
    RequestServiceDetails: RequestServiceDetails[];
    RequestFollowup: FollowUpDetails[];

    constructor(){
        this.RequestMaster = new RequestMaster();
        this.RequestServiceMasters = [];
        this.RequestServiceDetails = [];
        this.RequestFollowup = [];

    }
}