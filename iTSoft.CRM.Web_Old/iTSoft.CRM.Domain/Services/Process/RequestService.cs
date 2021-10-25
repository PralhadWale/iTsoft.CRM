using Dapper;
using iTSoft.CRM.Core.Helpers;
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
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Process
{
    public interface IRequestService
    {
        RequestMaster SaveRequest(RequestViewModel requestViewModel);

        ResponseCode AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels);
        RequestViewModel LoadRequest(long requestId);
        RequestViewModel LoadRequestServiceDetails(long requestServiceId);

        List<RequestDetails> SearchRequestServices(RequestSerchParameters requestSerchParameters);
        List<RequestSummery> SearchRequest(RequestSerchParameters requestSerchParameters);
        string GetNextrequestNumber(long requestTypeId);
        Quote GetQuoteDetails(long requestId);
        ResponseCode MarkSent(RequestServiceDetails requestService);
    }
    public class RequestService : GenericRepository<RequestMaster>, IRequestService
    {
        public const string PROC_RequestManager = "PROC_RequestManager";
        public const string PROC_RequestServiceManager = "PROC_RequestServiceManager";
        public const string PROC_RequestLookUpManager = "PROC_RequestLookUpManager";
        public const string PROC_RequestNoManager = "PROC_RequestNoManager";
        public const string PROC_AssignRequest= "PROC_AssignRequest";



        public RequestMaster SaveRequest(RequestViewModel requestViewModel)
        {
            RequestMaster requestMaster = new RequestMaster();
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = requestViewModel.RequestMaster.RequestId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(requestViewModel.OrganizationMaster);
                param.AddDynamicParams(requestViewModel.RequestMaster);

                DataTable requestServices = new ListConverter().ToDataTable<RequestServiceMaster>(requestViewModel.RequestServiceMasters);
                DataTable contractPersons = new ListConverter().ToDataTable<ContactPersonMaster>(requestViewModel.ContactPersonMasters);

                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                param.Add("ChildRequestNo", dbType: DbType.String, size: 50, direction: ParameterDirection.InputOutput);
                param.Add("@RequestServiceMasterType", requestServices.AsTableValuedParameter("RequestServiceMasterType"));
                param.Add("@ContactPersonMasterType", contractPersons.AsTableValuedParameter("ContactPersonMasterType"));

                dbConnection.Execute(PROC_RequestManager, param, commandType: CommandType.StoredProcedure);
                //requestMaster.RequestId =  param.Get<int>("@Result");
                requestMaster.RequestNo = param.Get<string>("ChildRequestNo");
            }

            return requestMaster;
        }

        public List<RequestDetails> SearchRequestServices(RequestSerchParameters requestSerchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(requestSerchParameters);
                param.Add("Action", "SearchRequestServices");
                return dbConnection.Query<RequestDetails>(PROC_RequestLookUpManager, param, commandType: CommandType.StoredProcedure).AsList();
            }
        }

        public List<RequestSummery> SearchRequest(RequestSerchParameters requestSerchParameters)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(requestSerchParameters);
                param.Add("Action", "SearchRequest");
                return dbConnection.Query<RequestSummery>(PROC_RequestLookUpManager, param, commandType: CommandType.StoredProcedure).AsList();
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
                requestViewModel.OrganizationMaster = result.Read<OrganizationMaster>().FirstOrDefault();
                requestViewModel.ContactPersonMasters = result.Read<ContactPersonMaster>().AsList();
                requestViewModel.RequestServiceDetails = result.Read<RequestServiceDetails>().AsList();
                requestViewModel.RequestFollowup = result.Read<FollowUpDetails>().AsList();
                base.ClearCatche();
            }

            if (System.IO.File.Exists(requestViewModel.RequestMaster.EmailHtmlPath))
            {
                requestViewModel.RequestMaster.Message = System.IO.File.ReadAllText(requestViewModel.RequestMaster.EmailHtmlPath);
            }
            return requestViewModel;
        }

        public RequestViewModel LoadRequestServiceDetails(long requestServiceId)
        {
            RequestViewModel requestViewModel = new RequestViewModel();
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("Action", "LoadRequestService");
                param.Add("RequestServiceId", requestServiceId);
                var result = dbConnection.QueryMultiple(PROC_RequestLookUpManager, param, commandType: CommandType.StoredProcedure);
                requestViewModel.RequestMaster = result.Read<RequestMaster>().FirstOrDefault();
                requestViewModel.OrganizationMaster = result.Read<OrganizationMaster>().FirstOrDefault();
                requestViewModel.ContactPersonMasters = result.Read<ContactPersonMaster>().AsList();
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

        public Quote GetQuoteDetails(long requestId)
        {
            Quote quote = new Quote();
            
            quote.QuoteItemDetails = new List<QuoteItemDetails>();
            
            RequestViewModel requestViewModel = this.LoadRequest(requestId);
            
            quote.RequestNumber = requestViewModel.RequestMaster.RequestNo;
            quote.RequestDate = requestViewModel.RequestMaster.RequestDate.GetValueOrDefault().ToString("dd-MMM-yyyy");

            NumberHelper numberHelper = new NumberHelper();
      
            if (requestViewModel.RequestMaster.ClientTypeId == (long)ClientType.Corporate)
            {
                quote.BuyerDetails = "Organization Name : " + requestViewModel.OrganizationMaster.OrganizationName + Environment.NewLine +
                    "Contact Person :" + requestViewModel.ContactPersonMasters[0].LastName + ' ' + requestViewModel.ContactPersonMasters[0].FirstName + Environment.NewLine +
                    "Address :" + requestViewModel.OrganizationMaster.Address + "  " + requestViewModel.OrganizationMaster.State + ' ' + requestViewModel.OrganizationMaster.Country + ' '+ requestViewModel.OrganizationMaster.Pincode + Environment.NewLine +
                    "Email :" + requestViewModel.OrganizationMaster.EmailId + Environment.NewLine +
                    "Phone No :" + requestViewModel.OrganizationMaster.PhoneNo + Environment.NewLine;
            }
            else
            {
                quote.BuyerDetails = "Client Name :" + requestViewModel.ContactPersonMasters[0].LastName + ' ' + requestViewModel.ContactPersonMasters[0].FirstName + Environment.NewLine +
                   "Address :" + requestViewModel.ContactPersonMasters[0].Address + "  " + requestViewModel.ContactPersonMasters[0].State + ' ' + requestViewModel.ContactPersonMasters[0].Country +  Environment.NewLine +
                   "Email :" + requestViewModel.ContactPersonMasters[0].Email + Environment.NewLine +
                   "Phone No :" + requestViewModel.ContactPersonMasters[0].PhoneNo1 + Environment.NewLine;
            }

            var acceptedServices = requestViewModel.RequestServiceDetails.Where(r => r.LeadStatusId == (long)LeadStatus.Converted || r.LeadStatusId == (long)LeadStatus.ProposalAccepted).ToList();
            int i = 1;

            //requestViewModel.RequestMaster.TotalAgreedNetAmount = 0;
            
            foreach(var service in requestViewModel.RequestServiceDetails)
            {
                quote.QuoteItemDetails.Add(new QuoteItemDetails
                {
                    SRNo = i.ToString(),
                    Description = service.ServiceName,
                    QTY = "1",
                   SERVICEPRICE = service.ServiceQuotedPrice.GetValueOrDefault().ToString("#0.00"),
                   SERVICEDISCOUNT = service.ServiceAgreedDiscountAmount.GetValueOrDefault().ToString("#0.00"),
                   SERVICENETAMOUNT = service.ServiceQuotedNetAmount.GetValueOrDefault().ToString("#0.00"),
                    SERVICETOTALPRICE = (service.ServiceQuotedPrice * service.Quantity).GetValueOrDefault().ToString("#0.00"),
                    SERVICETOTALDISCOUNT = (service.ServiceAgreedDiscountAmount * service.Quantity).GetValueOrDefault().ToString("#0.00"),
                    SERVICETOTALNETPRICE = ((service.ServiceQuotedPrice * service.Quantity) - (service.ServiceAgreedDiscountAmount * service.Quantity)).GetValueOrDefault().ToString("#0.00")
                }) ;
                //requestViewModel.RequestMaster.AgreedAmount += service.AgreedPrice.GetValueOrDefault();
            }


            quote.SUBTOTAL = requestViewModel.RequestMaster.TotalQuotedAmount.GetValueOrDefault().ToString("#0.00");
            quote.TOTALDISCOUNT = requestViewModel.RequestMaster.TotalAgreedDiscountAmount.GetValueOrDefault().ToString("#0.00");
            quote.NETAMOUNT = requestViewModel.RequestMaster.TotalAgreedNetAmount.GetValueOrDefault().ToString("#0.00");
            quote.TOTALGST = ((double)requestViewModel.RequestMaster.TotalAgreedNetAmount.GetValueOrDefault() * 0.18d).ToString("#0.00");
            quote.GRANDTOTAL = ((double)requestViewModel.RequestMaster.TotalAgreedNetAmount.GetValueOrDefault() + (double)requestViewModel.RequestMaster.TotalAgreedNetAmount.GetValueOrDefault() * 0.18d).ToString("#0.00");
            quote.TOTALINWORD = numberHelper.ToWords(Convert.ToDecimal(quote.GRANDTOTAL));

            return quote;
        }

        public ResponseCode MarkSent(RequestServiceDetails requestService)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add(nameof(RequestServiceDetails.RequestServiceId), requestService.RequestServiceId);
                param.Add(nameof(RequestServiceDetails.IsSent), requestService.IsSent);
                param.Add(nameof(RequestServiceDetails.SentBy), requestService.SentBy);
                param.Add(nameof(RequestServiceDetails.SentOn), requestService.SentOn);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_RequestServiceManager, param, commandType: CommandType.StoredProcedure);
                return (ResponseCode)param.Get<int>("@Result");
            }
        }
    }
}
