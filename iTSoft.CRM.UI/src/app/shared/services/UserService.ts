import { Injectable } from "@angular/core";
import { ChangePasswordModel } from 'src/app/administration/models/changePassword.model';
import { iTCRMAPIService } from 'src/app/core/services/ITSoftAPIService';
// import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({ providedIn: 'root', })
export class UserService {


    changePasswordURL: string = "/Account/ChangePassword";
    verifyAccountURL: string = "/Account/VerifyAccount";
    resetPasswordURL: string = "/Account/ResetPassword";
    VerifyOTPURL: string = "/Account/VerifyOTP";
    GetAdvisorNameURL: string = "/Account/GetAdvisorName";

    constructor(
        // private storage: Storage,
        private apiService: iTCRMAPIService, //private storageService: StorageService
    ) {

    }

    ChangePassword(changePasswordModel: ChangePasswordModel) {
        return this.apiService.POST(this.changePasswordURL, changePasswordModel)
    }

    VerifyAccount(userName: string) {
        return this.apiService.GETData(this.verifyAccountURL + "?userName=" + userName + "")
    }

    ResetPassword(changePasswordModel: ChangePasswordModel) {
        return this.apiService.POST(this.resetPasswordURL, changePasswordModel)
    }

    VerifyOTP(changePasswordModel: ChangePasswordModel) {
        return this.apiService.POST(this.VerifyOTPURL, changePasswordModel)
    }

    // public GetUserId() { return this.storageService.getItem("UserId"); }

    // public GetRoleId() { return this.storageService.getItem("RoleId"); }

    // public GetOrganizationId() { return this.storageService.getItem("OrganizationId"); }


    // public GetGroupId(): number {
    //     let groupId = this.storageService.getItem("GroupId");
    //     return isNaN(<number>groupId) ? 0 : <number>groupId;
    // }

    // public GetCategoryId(): number {
    //     let categoryId = this.storageService.getItem("CategoryId");
    //     return isNaN(<number>categoryId) ? 0 : <number>categoryId;
    // }

    // public SaveEfillingRequestGroupId(groupId: number) {
    //     this.storageService.setItem("GroupId", groupId);
    // }

    // public SaveCategory(categoryId: number) {
    //     this.storageService.setItem("CategoryId", categoryId);
    // }

    public GetDateFormat() {
        return 'dd-MMM-yyyy';
    }

    public GetCurrency() {
        return 'INR';
    }

    GetAdvisorName(UserId: number) {
        return this.apiService.GETData(this.GetAdvisorNameURL + "?UserId=" + UserId);
    }

}