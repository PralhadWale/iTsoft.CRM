import { inherits } from "util";

export class RequestServiceMaster {
    RequestServiceId: number;
    RequestId: number;
    ServiceId: number;
    LeadStatusId: number;
    StageId: number;
    DepartmentId: number;
    QuoatedPrice: number;
    AgreedPrice: number;
    Remark: string;
    TermsAndConditions: string;
    AdvisorId: number;
    LastFollowupDate: Date | string | null;
    NextFollowupDate: Date | string | null;

    constructor() {

    }
}


export class RequestServiceDetails extends RequestServiceMaster {
    ServiceName: string;
    LeadStatusName: string;
    DepartmentName: string;
    StageName: string;
    Attempts: number;
    Advisor: string;
    CompletedOn: Date | string | null;
    AssignedOn: Date | string | null;
    public constructor() {
        super();
        this.ServiceName = '';
        this.ServiceId = 0;
        this.Remark = '';
    }
}