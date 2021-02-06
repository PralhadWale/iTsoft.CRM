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
        ResponseCode SaveFollowUp(FollowUpMaster followupMaster);

        List<FollowUpDetails> SearchFollowUp(FollowUpSerchParameters FollowUpSerchParameters);
        ResponseCode AssignRequest(AssignAdvisorViewModel assignAdvisorViewModel);
    }
    public class FollowUpService : GenericRepository<FollowUpMaster>, IFollowUpService
    {
        public const string PROC_FollowUpLookUpManager = "PROC_FollowUpLookUpManager";
        public const string PROC_AssignFollowUp = "PROC_AssignFollowUp";
        public const string PROC_EnrollClient = "PROC_EnrollClient";
        public ResponseCode SaveFollowUp(FollowUpMaster followupMaster)
        {

            if(followupMaster.AddedOn.GetValueOrDefault() == DateTime.MinValue)
            {
                followupMaster.AddedOn = DateTime.Now;
            }


            if (followupMaster.FollowUpId == 0)
                base.Add(followupMaster);
            else
                base.Update(followupMaster);

            if(followupMaster.LeadStatusId == (int)LeadStatus.Won)
            {
                this.EnrollClient(followupMaster);
            }

            return ResponseCode.Success;
        }

        private void EnrollClient(FollowUpMaster followupMaster)
        {
            try
            {
                using (IDbConnection dbConnection = base.GetConnection())
                {
                    DynamicParameters param = new DynamicParameters(followupMaster.RequestId);
                     dbConnection.Execute(PROC_EnrollClient, param, commandType: CommandType.StoredProcedure);
                }
            }
            catch
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

        public ResponseCode AssignRequest(AssignAdvisorViewModel requestViewModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(requestViewModel.AdvisorId), requestViewModel.AdvisorId);
                param.Add(nameof(requestViewModel.FollowUpId), requestViewModel.FollowUpId);
                param.Add(nameof(requestViewModel.UpdatedBy), requestViewModel.UpdatedBy);
                param.Add(nameof(requestViewModel.TransferWithRequest), requestViewModel.TransferWithRequest);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_AssignFollowUp, param, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@Result");
            }
        }
    }
}
