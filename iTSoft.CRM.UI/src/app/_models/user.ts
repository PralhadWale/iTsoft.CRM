
export interface User {
    UserId: number;
    IsEmployee: boolean;
    isAuthenticated: boolean;
    UserName: string;
    Email: string;
    PhoneNumber: string;
    ProfileName: string;
    RoleId: number;
    OrganizationId: number;
    Token: any;
    UserDepartments:[];
}
