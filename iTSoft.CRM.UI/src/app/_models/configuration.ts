import { environment } from 'src/environments/environment';

export class ConfigurationSettings {
    public static get BASE_API_URL(): string { return environment.BASE_API_URL ; }

    public static get Account(): string { return "/Account"; }
    public static get EmployeeProfile(): string { return "/EmployeeProfile"; }
    public static get Employee(): string { return "/Employee"; }

    constructor() {

    }

    public static GetApplicationToken(): string {
        let ApplicationToken = <string>localStorage["ApplicationToken"];
        return ApplicationToken;
    }

    public static GetUserId(): number {
        // let userId = <number>localStorage["UserId"];
        let userId = 30025;
        return userId;
    }

    public static GetUserFinancialId(): number {
        // let userId = <number>localStorage["UserId"];
        let userFinancialId = 1;
        return userFinancialId;
    }
}
