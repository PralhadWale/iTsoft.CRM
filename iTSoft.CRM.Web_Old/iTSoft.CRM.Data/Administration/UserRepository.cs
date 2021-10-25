using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using System.Data;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Shared;
using iTSoft.CRM.Data.Entity.Master;

namespace iTSoft.CRM.Data.Administration
{
    public class UserRepository : BaseRepository
    {

        public const string PROC_ADM_UserManager = "PROC_ADM_UserManager";
        public const string PROC_UniqueIPManager = "PROC_UniqueIPManager";

        public UserRepository()
        {
        }
        
        public ResponseCode CheckDuplicate(string aadharId, string panNumber, string Email, long UserId)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                if (dbConnection.ExecuteScalar<long>("Select Count(1) From UserMaster where [UserId] != " + UserId + " and Email = '" + Email + "'") > 0)
                {
                    result = ResponseCode.Success;
                }
                else
                {
                    result = ResponseCode.NotFound;
                }
            }
            return result;
        }

        public ResponseCode ChangePassword(LoginModel loginModel)
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
                return (ResponseCode)param.Get<int>("@DbResult");
            }

        }

        public ResponseCode ResetPassword(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "ForgotPassword");
                param.Add("@NewPassword", loginModel.NewPassword);
                param.Add("@Email", loginModel.Email);
                param.Add("@UserID", loginModel.UserID);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@DbResult");
            }
        }



        public ResponseCode Save(UserMasterVM userMasterVM)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                ListConverter listConverter = new ListConverter();
                DataTable rolesDataTable = listConverter.ToDataTable<IdentityUserRole>(userMasterVM.usrRoles);
                DynamicParameters param = new DynamicParameters();

                param.Add("@UserID", userMasterVM.UserId);
                param.Add("@LastName", userMasterVM.LastName);
                param.Add("@FirstName", userMasterVM.FirstName);
                param.Add("@MiddleName", userMasterVM.MiddleName);
                param.Add("@Email", userMasterVM.Email);
                param.Add("@Password", userMasterVM.Password);
                param.Add("@UserName", userMasterVM.UserName);
                param.Add("@MobileNo", userMasterVM.MobileNo);
                param.Add("@PhoneNo", userMasterVM.PhoneNo);
                param.Add("@OCode", userMasterVM.OCode);
                param.Add("@IsEmployee", userMasterVM.IsEmployee);
                param.Add("@IsActive", userMasterVM.IsActive);
                param.Add("@AddedBy", userMasterVM.AddedBy);
                param.Add("@AddedOn", userMasterVM.AddedDate);
                param.Add("@UpdatedBy", userMasterVM.UpdatedBy);
                param.Add("@UpdatedOn", userMasterVM.UpdatedDate);

                param.Add("@UserRoles", rolesDataTable.AsTableValuedParameter("IdentityUserRoleType"));
                param.Add("@Status", userMasterVM.UserId > 0 ? ActionFlag.Update : ActionFlag.Add);
                param.Add("@DbResult", dbType: DbType.Int64, direction: ParameterDirection.Output);

                dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<long>("@DbResult");
            }
        }

        public ResponseCode UpdateAppToken(LoginModel inputModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(inputModel);
                param.Add("@Status", ActionFlag.UpdateAppToken);
                dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<long>("@DbResult");
            }
        }

        public List<UserMasterVM> ListUsers()
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Status", ActionFlag.Display);
            return base.QueryList<UserMasterVM>(PROC_ADM_UserManager, param, commandTimeout: 0);
        }

        public UserMasterVM FindUser(long userId)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Status", ActionFlag.Find);
            param.Add("@UserId", userId);
            return base.QueryList<UserMasterVM>(PROC_ADM_UserManager, param, commandTimeout: 0).FirstOrDefault();
        }

        public UserMasterVM FindUser(string userName)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Status", ActionFlag.Find);
            param.Add("@UserName", userName);
            return base.QueryList<UserMasterVM>(PROC_ADM_UserManager, param, commandTimeout: 0).FirstOrDefault();
        }

        public IdentityUserDetails VerifyUser(string username, string password, bool fromSocialLogin)
        {
            string queryText = "Select I.* ,IR.ISSeller,IR.ISParty,IU.OrganizationId,IR.RoleId, U.FirstName+' '+U.LastName  As ProfileName From  IdentityUser I Join UserMaster U ON I.UserId = U.UserId Join IdentityUserRole IU On I.UserId = IU.UserId Join IdentityRole IR On IR.RoleId = IU.RoleId where I.UserName ='" + username + "'";
            if (!fromSocialLogin)
            {
                queryText += "and I.PasswordHash = '" + password + "'";
            }
            
            var identityUser = base.QueryList<IdentityUserDetails>(queryText, commandTimeout: 0, commandType: CommandType.Text, param: null).FirstOrDefault();
            if(identityUser != null)
            {
                 identityUser.UserDepartments = base.QueryList<DepartmentMaster>("Select  DepartmentMaster.* From DepartmentMaster Join EmployeeDepartmentMaster on DepartmentMaster.DepartmentId = EmployeeDepartmentMaster.DepartmentId Where EmployeeId = " + identityUser.UserId +"", commandTimeout: 0, commandType: CommandType.Text, param: null);
            }

            return identityUser;
        }

        public LoginModel CheckOldPassword(LoginModel loginModel)
        {
            LoginModel result;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Password", loginModel.Password);
            param.Add("@UserID", loginModel.UserID);
            param.Add("@Action", ActionFlag.Find);
            result = base.QueryList<LoginModel>(PROC_ADM_UserManager, param).FirstOrDefault();
            return result;
        }

        public List<IdentityUserRole> GetIdentityUserRoles(long userId)
        {
            return base.QueryList<IdentityUserRole>("select RoleId from identityuserrole where userid=" + userId, commandTimeout: 0, commandType: CommandType.Text, param: null);
        }

        public UserProfileDetails UserProfileDetail(long userId)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Status", "UserProfileDetails");
            param.Add("@UserId", userId);
            return base.QueryList<UserProfileDetails>(PROC_ADM_UserManager, param, commandTimeout: 0).FirstOrDefault();
        }


        public ResponseCode SaveOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "SaveOTP");
                param.Add("@UserID", loginModel.UserID);
                param.Add("@OTP", loginModel.OTP);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@DbResult");
            }
        }


        public ResponseCode VerifyOTP(LoginModel loginModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "VerifyOTP");
                param.Add("@OTP", loginModel.OTP);
                param.Add("@UserID", loginModel.UserID);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@DbResult");
            }
        }

        public ResponseCode CheckUserLoginAvailable(string userLogin)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Email", userLogin);
                param.Add("@Status", ActionFlag.CheckUserLoginAvailable);
                param.Add("@DbResult", 0, DbType.Int32, ParameterDirection.InputOutput);
                int result = dbConnection.Execute(PROC_ADM_UserManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@DbResult");
            }
        }

        public ResponseCode SaveUniqueIP(string ipAddress)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@IPAddress", ipAddress);
                param.Add("@Action", "Save");
                int result = dbConnection.Execute(PROC_UniqueIPManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
                return ResponseCode.Success;
            }
        }

        public long GetUniqueIpCount()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Count");
                return dbConnection.ExecuteScalar<long>(PROC_UniqueIPManager, param, commandTimeout: 0, commandType: CommandType.StoredProcedure);
            }
        }

        public LoginModel GetUserData(long userId)
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Status", "GetUserData");
            param.Add("@UserId", userId);
            return base.QueryList<LoginModel>(PROC_ADM_UserManager, param, commandTimeout: 0).FirstOrDefault();
        }

        public List<IdentityUser> GetAllUser()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Status", "GetAllUser");

                List<IdentityUser> data = dbConnection.Query<IdentityUser>(PROC_ADM_UserManager, param, commandType: CommandType.StoredProcedure).ToList();
                return data;
            }
        }

        public ResponseCode UpdatePassword(IdentityUser identityUser)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                try
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("@UserID", identityUser.UserId);
                    param.Add("@NewPassword", identityUser.PasswordHash);
                    param.Add("@Status", "UpdatePassword");
                    param.Add("@DbResult", DbType.Int64, direction: ParameterDirection.InputOutput);
                    dbConnection.Execute(PROC_ADM_UserManager, param, commandType: CommandType.StoredProcedure);
                    return (ResponseCode)param.Get<int>("@DbResult");
                }
                catch (Exception ex)
                {
                    throw ex;
                }

            }
        }

        public UserMasterView GetAdvisorName(long UserId)
        {
            UserMasterView result;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@UserID", UserId);
                param.Add("@Status", "GetAdvisorName");
                result = dbConnection.Query<UserMasterView>(PROC_ADM_UserManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }
    }
}
