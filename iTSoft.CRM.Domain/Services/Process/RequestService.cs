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
    public interface IRequestService
    {
        ResponseCode SaveRequest(RequestViewModel requestViewModel);

        List<RequestDetails> SearchRequest(RequestSerchParameters requestSerchParameters);
    }
    public class RequestService : GenericRepository<RequestMaster>, IRequestService
    {
        public const string PROC_RequestManager = "PROC_RequestManager";
        public const string PROC_RequestLookUpManager = "PROC_RequestLookUpManager";
        public ResponseCode SaveRequest(RequestViewModel requestViewModel)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = requestViewModel.RequestMaster.RequestId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(requestViewModel.RequestMaster);

                DataTable requestServices = new ListConverter().ToDataTable<RequestServiceMaster>(requestViewModel.RequestServiceMasters);

                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                param.Add("@RequestServiceMasterType", requestServices.AsTableValuedParameter("RequestServiceMasterType"));
                dbConnection.Execute(PROC_RequestManager, param, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@Result");
            }
        }

        public List<RequestDetails> SearchRequest(RequestSerchParameters requestSerchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(requestSerchParameters);
                param.Add("Action", "SearchRequest");
                return dbConnection.Query<RequestDetails>(PROC_RequestLookUpManager, param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
    }
}
