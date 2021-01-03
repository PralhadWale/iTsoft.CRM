import { environment } from 'src/environments/environment';
import { User } from '.';
const APP_USER_PROFILE = "IT_CRM_USER_DATA_1.0"
export class ConfigurationSettings {
    public static get BASE_API_URL(): string { return environment.BASE_API_URL ; }

    public static get Account(): string { return "/Account"; }
    public static get EmployeeProfile(): string { return "/EmployeeProfile"; }
    public static get Employee(): string { return "/Employee"; }

    constructor() {

    }

    public static get User() {
        let user = <User>JSON.parse(localStorage.getItem(APP_USER_PROFILE));
        return user;
      }
   
  
}
