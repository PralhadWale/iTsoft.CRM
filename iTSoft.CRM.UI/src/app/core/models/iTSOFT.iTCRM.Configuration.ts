
export class iTCRMSettings {
    //Development
    public static get BASE_API_URL(): string { return "http://localhost:44396"; }
    public static get REPORT_APP_URL(): string { return "http://localhost:44396"; }
    public static get REPORT_API_URL(): string { return "http://localhost:44396"; }

    public static get Administration(): string { return "/Administration"; }
    public static get Masters(): string { return ""; }
    public static get Process(): string { return ""; }

    constructor() {

    }

}
