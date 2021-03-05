import { inherits } from "util";

export class RequestServiceMaster
{
    RequestServiceId: number;
    RequestId: number;
    ServiceId: number;
    DepartmentId : number;
    QuoatedPrice : number;
    AgreedPrice: number;
    Remark : string;

    constructor()
    {

    }
}


export class RequestServiceDetails extends RequestServiceMaster
{
    ServiceName: string;
    LeadStatusName: string;
    DepartmentName: string;
    
    public constructor()
    {
        super();
        this.ServiceName = '';
        this.ServiceId = 0;
        this.Remark = '';
    }
}