import { DepartmentMaster } from "../department/department.model";

export class EmployeeMaster {
    EmployeeId: number;
    FirstName: string;
    MiddleName: string;
    LastName: string;
    MobileNo1: string;
    MobileNo2: string;
    EmailId: string;
    Address1: string;
    Address2: string;
    PostalCode: string;
    Designation : string;
    Role : string;
    DesignationId : number;
    DepartmentId : number;
    RoleId : number;
    AadharNo: string;
    UniqueID: string;
    LoginName: string;
    TargetAmount:number;
    Password: string;
    IsActive: boolean | null;
    AddedBy: number | null;
    UpdatedBy: number | null;
    AddedDate: Date | string | null;
    UpdatedDate: Date | string | null;
}


export class EmployeeDetails
{
    EmployeeMaster : EmployeeMaster;
    DepartmentMasters : Array<DepartmentMaster>;
}