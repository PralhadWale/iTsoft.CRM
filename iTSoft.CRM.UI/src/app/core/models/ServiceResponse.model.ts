export class ServiceResponseModel {
    ResponseCode: ResponseCode;
    Message: string;
    ResponseData: any;
}

export enum ResponseCode {
    Success = 1,
    Failed = 10000,
    ApplicationError = 10001,
    DataBaseError = 10002,
    InvalidUserNameOrPassword = 10003,
    NotFound = 10004,
    AlreadyExists = 10005,
    InUse = 10006,
    NotAllowed = 10007,
    AlreadyCancelled = 10008,
    AlreadyRedeemed = 10009,
    EmailAlreadyExists = 10010,
    PANAlreadyExists = 10011,
    UserNameAlreadyExists = 10012,
    AllowedClientDiscount=10013,
    GenerateRequest=10014,
    SelectQuestion=10015,
    UploadDocument=10016,
    PayNow=10017,
    OldClient=10018,
    PersonalInfo=10019
}
