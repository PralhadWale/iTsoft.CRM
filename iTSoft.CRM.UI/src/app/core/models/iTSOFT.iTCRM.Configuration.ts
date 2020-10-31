
export class iTCRMSettings {
    //Global
    //public static get BASE_API_URL(): string { return "https://taxblock.in/api";}
    //public static get BASE_API_URL(): string { return "http://208.109.14.18:64365";}
    //public static get REPORT_API_URL(): string { return  "https://taxblock.in/api";}
    // public static get BASE_API_URL(): string { return "https://etaxuat.taxblock.in/api"; }


    //Local
    // public static get BASE_API_URL(): string { return "http://192.168.1.5:1436";}
    // public static get REPORT_API_URL(): string { return  "http://192.168.1.5:1435";}

    //Development
    public static get BASE_API_URL(): string { return "http://localhost:44396"; }
    public static get REPORT_APP_URL(): string { return "http://localhost:44396"; }
    public static get REPORT_API_URL(): string { return "http://localhost:44396"; }

    public static get Administration(): string { return "/Administration"; }
    public static get Masters(): string { return ""; }

    constructor() {

    }

}
