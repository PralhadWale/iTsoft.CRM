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
    }
}
