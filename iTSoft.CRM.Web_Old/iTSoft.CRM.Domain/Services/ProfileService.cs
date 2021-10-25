using AutoMapper;
using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Helpers;
using iTSoft.CRM.Data.Repository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.CRM.Domain.Services
{

    public interface IProfileService
    {


        /// <summary>
        /// load user dashboard info
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<RevenueDashboardData> UseRevenueDashboard(long userId);
    }
    public class ProfileService : BaseRepository, IProfileService
    {
        private readonly IMapper _iMapper;

        public const string PROC_LoadUserRevenueDashboard = "PROC_LoadUserRevenueDashboard";
        public ProfileService(IMapper iMapper)
        {
            this._iMapper = iMapper;
        }

        public async Task<RevenueDashboardData> UseRevenueDashboard(long userId)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("UserId", userId);
                return await dbConnection.QueryFirstAsync<RevenueDashboardData>(PROC_LoadUserRevenueDashboard, param, commandType: CommandType.StoredProcedure);
            }
        }
    }
}

