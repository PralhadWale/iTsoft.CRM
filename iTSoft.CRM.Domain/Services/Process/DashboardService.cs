using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Domain.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.CRM.Domain.Services.Process
{

    public interface IDashboardService
    {
         Task<List<LeadSourceDashboardViewModel>> GetLeadSourceDashboard(DashboardSearchParameters searchParameters);

        Task<RevenueTargetDashboardViewModel> GetRevenueTargetDashboard(DashboardSearchParameters searchParameters);

        Task<List<TopNEmployeeDashboardViewModel>> GetTopNEmployeeDashboard(DashboardSearchParameters searchParameters);

        Task<List<DepartmentWiseRevenueDashboardViewModel>> GetDepartmentWiseRevenueDashboard(DashboardSearchParameters searchParameters);

        Task<List<LeadStatusDashboardViewModel>> GetLeadStatusDashboard(DashboardSearchParameters searchParameters);


    }
    public class DashboardService : BaseRepository, IDashboardService
    {
        public const string PROC_LeadSourceDashboard = "PROC_LeadSourceDashboard";
        public const string PROC_RevenueTargetDashboard = "PROC_RevenueTargetDashboard";

        public const string PROC_TopNEmployeeDashboard = "PROC_TopNEmployeeDashboard";
        public const string PROC_DepartmentWiseRevenueDashboard = "PROC_DepartmentWiseRevenueDashboard";
        public const string PROC_StatusWiseLeadDashboard = "PROC_StatusWiseLeadDashboard";

        public async Task<List<DepartmentWiseRevenueDashboardViewModel>> GetDepartmentWiseRevenueDashboard(DashboardSearchParameters searchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(searchParameters.FromDate), searchParameters.FromDate);
                param.Add(nameof(searchParameters.ToDate), searchParameters.ToDate);
                var result = await dbConnection.QueryAsync<DepartmentWiseRevenueDashboardViewModel>(PROC_DepartmentWiseRevenueDashboard, param, commandType: CommandType.StoredProcedure);

                return await Task.FromResult(result.AsList<DepartmentWiseRevenueDashboardViewModel>());
            }
        }

        public async Task<List<LeadSourceDashboardViewModel>> GetLeadSourceDashboard(DashboardSearchParameters searchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(searchParameters.AdvisorId), searchParameters.AdvisorId);
                param.Add(nameof(searchParameters.FromDate), searchParameters.FromDate);
                param.Add(nameof(searchParameters.ToDate), searchParameters.ToDate);
                var result = await dbConnection.QueryAsync<LeadSourceDashboardViewModel>(PROC_LeadSourceDashboard, param, commandType: CommandType.StoredProcedure);

                return await Task.FromResult(result.AsList<LeadSourceDashboardViewModel>());
            }
        }

        public async Task<List<LeadStatusDashboardViewModel>> GetLeadStatusDashboard(DashboardSearchParameters searchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(searchParameters.FromDate), searchParameters.FromDate);
                param.Add(nameof(searchParameters.ToDate), searchParameters.ToDate);
                var result = await dbConnection.QueryAsync<LeadStatusDashboardViewModel>(PROC_StatusWiseLeadDashboard, param, commandType: CommandType.StoredProcedure);
                return await Task.FromResult(result.AsList<LeadStatusDashboardViewModel>());
            }
        }

        public async Task<RevenueTargetDashboardViewModel> GetRevenueTargetDashboard(DashboardSearchParameters searchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(searchParameters.AdvisorId), searchParameters.AdvisorId);
                param.Add(nameof(searchParameters.FromDate), searchParameters.FromDate);
                param.Add(nameof(searchParameters.ToDate), searchParameters.ToDate);
                var result = await dbConnection.QueryAsync<RevenueTargetDashboardViewModel>(PROC_RevenueTargetDashboard, param, commandType: CommandType.StoredProcedure);
                return await Task.FromResult(result.AsList<RevenueTargetDashboardViewModel>().FirstOrDefault());
            }
        }

        public async Task<List<TopNEmployeeDashboardViewModel>> GetTopNEmployeeDashboard(DashboardSearchParameters searchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(searchParameters.FromDate), searchParameters.FromDate);
                param.Add(nameof(searchParameters.ToDate), searchParameters.ToDate);
                param.Add(nameof(searchParameters.NumberOfEmployees), searchParameters.NumberOfEmployees);
                var result = await dbConnection.QueryAsync<TopNEmployeeDashboardViewModel>(PROC_TopNEmployeeDashboard, param, commandType: CommandType.StoredProcedure);
                return await Task.FromResult(result.AsList<TopNEmployeeDashboardViewModel>());
            }
        }
    }
}
