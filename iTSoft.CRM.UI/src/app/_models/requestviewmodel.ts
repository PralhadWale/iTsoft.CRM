import { ContactPersonMaster } from './contactPerson';
import { FollowUpDetails } from './followupdetails';
import { OrganizationMaster } from './organization';
import { RequestMaster } from './request';
import { RequestServiceDetails, RequestServiceMaster } from './requestservice';


export class RequestViewModel
{
    RequestMaster: RequestMaster;
    OrganizationMaster : OrganizationMaster;
    ContactPersonMaster : ContactPersonMaster;
    ContactPersonMasters : ContactPersonMaster[];
    RequestServiceMasters: RequestServiceMaster[];
    RequestServiceDetails: RequestServiceDetails[];
    RequestFollowup: FollowUpDetails[];

    constructor(){
        this.RequestMaster = new RequestMaster();
        this.ContactPersonMaster = new ContactPersonMaster();
        this.OrganizationMaster = new OrganizationMaster();
        this.ContactPersonMasters = [];
        this.RequestServiceMasters = [];
        this.RequestServiceDetails = [];
        this.RequestFollowup = [];

    }
}