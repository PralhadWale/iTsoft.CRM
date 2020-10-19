export interface Organization {
    OrganizationId: number;
    OrganizationName: string;
    OrganizationCode: string;
    Description: string;
    TariffId: number | null;
    Website: string;
    EmailId: string;
    MobileNo: string;
    PhoneNo: string;
    Address: string;
    District: string;
    State: string;
    Pincode: string;
    AddedDate: Date | string | null;
    AddedBy: number | null;
    UpdatedBy: number | null;
    UpdatedDate: Date | string | null;

    TariffName: string;
}
