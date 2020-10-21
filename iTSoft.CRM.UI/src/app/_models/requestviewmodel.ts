import { FollowUpDetails } from './followupdetails';
import { RequestMaster } from './request';
import { RequestDetails } from './requestdetails';
import { RequestServiceMaster } from './requestservice';


export class RequestViewModel
{
    RequestMaster: RequestMaster;
    RequestServiceMasters: RequestServiceMaster[];
    RequestServiceDetails: RequestDetails[];
    RequestFollowup: FollowUpDetails[];
}