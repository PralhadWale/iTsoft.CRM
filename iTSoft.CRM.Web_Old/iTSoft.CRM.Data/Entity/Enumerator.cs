using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{

    public class ActionFlag
    {
        public const string Display = "Display";
        public const string DisplayList = "DisplayList";
        public const string Find = "Find";
        public const string Add = "Add";
        public const string Update = "Update";
        public const string UpdateIncomeTax = "UpdateIncomeTax";
        public const string Delete = "Delete";
        public const string SelectList = "SelectList";
        public const string RoleMenu = "RoleMenu";
        public const string DisplayByEmployee = "DisplayByEmployee";
        public const string Lookup = "Lookup";
        public const string ChangeStatus = "ChangeStatus";
        public const string ChangePassword = "ChangePassword";
        public const string EmpPhoto = "EmpPhoto";
        public const string Create = "Create";
        public const string Registration = "Registration";
        public const string Admission = "Admission";
        public const string Circulation = "Circulation";
        public const string UpdateAppToken = "UpdateAppToken";
        public const string MenusByUserId = "MenusByUserId";
        public const string ModuleTreeMenuList = "ModuleTreeMenuList";
        public const string MenusByRoleId = "MenusByRoleId";
        public const string RoleAllMenuList = "RoleAllMenuList";
        public const string SaveSMSTemplate = "SaveSMSTemplate";
        public const string UpdateSMSTemplate = "UpdateSMSTemplate";
        public const string SaveEmailTemplate = "SaveEmailTemplate";
        public const string UpdateEmailTemplate = "UpdateEmailTemplate";
        public const string CheckUserLoginAvailable = "CheckUserLoginAvailable";
        public const string GetCareersSummaryList = "GetCareersSummaryList";
        public const string GetCareersSummaryDetails = "GetCareersSummaryDetails";
        public const string SaveEFillingRequest = "SaveEFillingRequest";
        public const string UpdateEFillingRequest = "UpdateEFillingRequest";
    }

    public enum TableType
    {
        Table = 1,
        View
    }

    public enum MeetingStatus
    {
        Created = 1,
        Closed,
        Hold,
        Postponed
    }

    public enum PaymentStatusEnum
    {
        Unverified = 1,
        Verified,
        Rejected,
        Disputed
    }

    public enum PaymentModeEnum
    {
        PaymentGateway = 1,
        NetBanking,
        DD,
        Cheque,
    }

}
