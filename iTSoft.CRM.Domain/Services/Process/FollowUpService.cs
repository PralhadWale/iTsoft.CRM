using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Shared;
using iTSoft.CRM.Domain.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Process
{
    public interface IFollowUpService
    {
        ResponseCode SaveFollowUp(FollowupMaster followupMaster);

        List<FollowUpDetails> SearchFollowUp(FollowUpSerchParameters FollowUpSerchParameters);
    }
    public class FollowUpService : GenericRepository<FollowupMaster>, IFollowUpService
    {
        public const string PROC_FollowUpLookUpManager = "PROC_FollowUpLookUpManager";
        public ResponseCode SaveFollowUp(FollowupMaster followupMaster)
        {
            if (followupMaster.FollowUpId == 0)
                base.Add(followupMaster);
            else
                base.Update(followupMaster);

            return ResponseCode.Success;
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
    }
}
