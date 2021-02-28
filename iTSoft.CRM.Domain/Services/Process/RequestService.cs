using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Shared;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Process
{
    public interface IRequestService
    {
        ResponseCode SaveRequest(RequestViewModel requestViewModel);

        ResponseCode AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels);
        RequestViewModel LoadRequest(long requestId);

        List<RequestDetails> SearchRequest(RequestSerchParameters requestSerchParameters);
        string GetNextrequestNumber(long requestTypeId);
    }
    public class RequestService : GenericRepository<RequestMaster>, IRequestService
    {
        public const string PROC_RequestManager = "PROC_RequestManager";
        public const string PROC_RequestLookUpManager = "PROC_RequestLookUpManager";
        public const string PROC_RequestNoManager = "PROC_RequestNoManager";
        public const string PROC_AssignRequest= "PROC_AssignRequest";



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

        public RequestViewModel LoadRequest(long requestId)
        {
            RequestViewModel requestViewModel = new RequestViewModel();
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("Action", "LoadRequest");
                param.Add("RequestId",requestId);
                var result = dbConnection.QueryMultiple(PROC_RequestLookUpManager, param, commandType: CommandType.StoredProcedure);
                requestViewModel.RequestMaster = result.Read<RequestMaster>().FirstOrDefault();
                requestViewModel.RequestServiceDetails = result.Read<RequestServiceDetails>().AsList();
                requestViewModel.RequestFollowup = result.Read<FollowUpDetails>().AsList();
                base.ClearCatche();
            }

            return requestViewModel;
        }

        public string GetNextrequestNumber(long requestTypeId)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("requestTypeId", requestTypeId);
                return dbConnection.Query<string>(PROC_RequestNoManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
        }

        public ResponseCode AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                DataTable requests = new ListConverter().ToDataTable<AssignAdvisorViewModel>(assignAdvisorViewModels);
                param.Add("@RequestDetails", requests.AsTableValuedParameter("AssignAdvisorType"));
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_AssignRequest, param, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@Result");
            }
        }
    }
}
