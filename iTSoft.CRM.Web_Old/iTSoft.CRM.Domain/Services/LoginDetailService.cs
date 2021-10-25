using AutoMapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Helpers;
using iTSoft.CRM.Data.Repository;
using iTSoft.CRM.Domain.Models;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Core;
using Dapper;
using iTSoft.Communication.Models;
using iTSoft.Communication.Service.Helpers;

namespace iTSoft.CRM.Domain.Services
{
    public interface ILoginDetailService
    {

        /// <summary>
        ///   used to check if used is valid user or not
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        Task<IdentityUserDetails> VerifyUser(LoginModel loginModel);
        Task<ResponseCode> SaveOTP(LoginModel loginModel);
        Task<ResponseCode> VerifyOTP(LoginModel loginModel);
        Task<ResponseCode> ChangePassword(LoginModel loginModel);
        Task<ResponseCode> ResetPassword(LoginModel loginModel);
        Task<UserMasterVM> FindUser(long userId);
        Task<UserMasterVM> FindUser(string userName);

    }
    public class LoginDetailService : BaseRepository, ILoginDetailService
    {
        private readonly ICRMDapper _CRMDapper;
        private readonly IMapper _iMapper;

        public const string PROC_ADM_UserManager = "PROC_ADM_UserManager";
        public LoginDetailService(ICRMDapper CRMDapper, IMapper iMapper)
        {
            this._CRMDapper = CRMDapper;
            this._iMapper = iMapper;
        }



        public async Task<IdentityUserDetails> VerifyUser(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(loginModel);
                param.Add("Action", "CheckLogin");
                var result = dbConnection.Query<IdentityUserDetails>(PROC_ADM_UserManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

        public async Task<ResponseCode> ChangePassword(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "changePassword");
                param.Add("@Password", loginModel.Password);
                param.Add("@UserID", loginModel.UserID);
                param.Add("@NewPassword", loginModel.NewPassword);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                var responseCode = (ResponseCode)param.Get<int>("@DbResult");
                if ((responseCode == ResponseCode.Success))
                {
                    NotificationHelper notificationHelper = new NotificationHelper();
                    EmailTemplateMasterVM emailTemplateMaster = NotificationTemplateList.EmailTemplateMasters.Where(t => t.EmailTemplateId == (int)TemplateType.ChangePassword).FirstOrDefault();
                    notificationHelper.SendMail<LoginModel>(emailTemplateMaster, loginModel.Email, loginModel);
                }
                return await Task.FromResult(responseCode);
            }
        }

        public async Task<ResponseCode> ResetPassword(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "ForgotPassword");
                param.Add("@NewPassword", loginModel.Password);
                param.Add("@Email", loginModel.Email);
                param.Add("@UserID", loginModel.UserID);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                var responseCode = (ResponseCode)param.Get<int>("@DbResult");
                if ((responseCode == ResponseCode.Success))
                {
                    NotificationHelper notificationHelper = new NotificationHelper();
                    EmailTemplateMasterVM emailTemplateMaster = NotificationTemplateList.EmailTemplateMasters.Where(t => t.EmailTemplateId == (int)TemplateType.ForgotPassword).FirstOrDefault();
                    if (emailTemplateMaster != null && !string.IsNullOrEmpty(loginModel.Email))
                    {
                        notificationHelper.SendMail<LoginModel>(emailTemplateMaster, loginModel.Email, loginModel);
                    }
                }
                return await Task.FromResult(responseCode);
            }
        }



        public async Task<ResponseCode> SaveOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "SaveOTP");
                param.Add("@UserID", loginModel.UserID);
                param.Add("@OTP", loginModel.OTP);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                var responseCode = (ResponseCode)param.Get<int>("@DbResult");
                return await Task.FromResult(responseCode);
            }
        }


        public async Task<ResponseCode> VerifyOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "VerifyOTP");
                param.Add("@OTP", loginModel.OTP);
                param.Add("@UserID", loginModel.UserID);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                var responseCode = (ResponseCode)param.Get<int>("@DbResult");
                return await Task.FromResult(responseCode);
            }
        }

        public async Task<UserMasterVM> FindUser(long userId)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", ActionFlag.Find);
                param.Add("@UserId", userId);
                var result = dbConnection.Query<UserMasterVM>(PROC_ADM_UserManager, param, commandTimeout: 0 , commandType:CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

        public async Task<UserMasterVM> FindUser(string userName)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", ActionFlag.Find);
                param.Add("@UserName", userName);
                var result = dbConnection.Query<UserMasterVM>(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return await Task.FromResult(result);
            }
        }

    }
}
