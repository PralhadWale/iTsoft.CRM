using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Enum;
using iTSoft.CRM.Data.Shared;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Process
{
    public interface IFollowUpService
    {
        string SaveFollowUp(FollowUpMaster followupMaster);
        List<FollowUpDetails> SearchFollowUp(FollowUpSerchParameters FollowUpSerchParameters);
        ResponseCode AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels);
    }
    public class FollowUpService : GenericRepository<FollowUpMaster>, IFollowUpService
    {
        public const string PROC_FollowUpManager = "PROC_FollowUpManager";
        public const string PROC_FollowUpLookUpManager = "PROC_FollowUpLookUpManager";
        public const string PROC_AssignFollowUp = "PROC_AssignFollowUp";
        public const string PROC_EnrollClient = "PROC_EnrollClient";
        public string SaveFollowUp(FollowUpMaster followupMaster)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(followupMaster);
                param.Add("Result", dbType: DbType.Int64, direction: ParameterDirection.InputOutput);
                param.Add("ChildRequestNo", dbType: DbType.String, size:50, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_FollowUpManager, param, commandType: CommandType.StoredProcedure);
                return param.Get<string>("ChildRequestNo");
            }
        }

        private void EnrollClient(FollowUpMaster followupMaster)
        {
            try
            {
                using (IDbConnection dbConnection = base.GetConnection())
                {
                    DynamicParameters param = new DynamicParameters();
                    param.Add("RequestId", followupMaster.RequestId);
                    param.Add("RequestServiceId", followupMaster.RequestServiceId);
                    dbConnection.Execute(PROC_EnrollClient, param, commandType: CommandType.StoredProcedure);
                }
            }
            catch(Exception ex)
            {

            }
        }

        public List<FollowUpDetails> SearchFollowUp(FollowUpSerchParameters FollowUpSerchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(FollowUpSerchParameters);
                param.Add("Action", "SearchFollowUp");
                return dbConnection.Query<FollowUpDetails>(PROC_FollowUpLookUpManager, param, commandType: CommandType.StoredProcedure).AsList();
            }
        }

        public ResponseCode AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                DataTable requests = new ListConverter().ToDataTable<AssignAdvisorViewModel>(assignAdvisorViewModels);
                param.Add("@FollowupDetails", requests.AsTableValuedParameter("AssignAdvisorType"));
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_AssignFollowUp, param, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@Result");
            }
        }
    }
}
