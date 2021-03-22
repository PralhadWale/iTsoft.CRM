using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Entity.ViewModel;
using iTSoft.CRM.Data.Shared;
using iTSoft.CRM.Data.ViewModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Data.Repository.Master
{
    public class ClientRepository : BaseRepository
    {
        public IDbConnection dbConnection;
        public ClientRepository()
        {
            dbConnection = base.GetConnection();
        }

        private const string PROC_ClientManager = "PROC_ClientManager";
        private const string PROC_ClientLookupManager = "PROC_ClientLookupManager";
        

        public ResponseCode Save(ClientViewModel clientViewModel)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                    DynamicParameters param = new DynamicParameters(clientViewModel.OrganizationMaster);
                    param.AddDynamicParams(clientViewModel.ClientMaster);
                    DataTable contractPersons = new ListConverter().ToDataTable<ContactPersonMaster>(clientViewModel.ContactPersonMasters);
                    param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                    param.Add("@ContactPersonMasterType", contractPersons.AsTableValuedParameter("ContactPersonMasterType"));
                    dbConnection.Execute(PROC_ClientManager, param, commandType: CommandType.StoredProcedure);
                    result = (ResponseCode)param.Get<int>("Result");
            }
            return result;
        }

        public List<ClientDetails> SearchClient(ClientDetails clientMaster)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(clientMaster);
                param.Add("@Action", "Search");
                List<ClientDetails> customerData = dbConnection.Query<ClientDetails>(PROC_ClientLookupManager, param, commandType: CommandType.StoredProcedure).ToList();
                return customerData;
            }
        }

        public List<ClientMaster> GetCustomerInfo(EmployeeMasterSearchParam searchParam)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@FirstName", searchParam.FirstName);
                param.Add("@MiddleName", searchParam.MiddleName);
                param.Add("@LastName", searchParam.LastName);
                param.Add("@Action", "GetEmployeeInfo");
                List<ClientMaster> customerData = dbConnection.Query<ClientMaster>(PROC_ClientLookupManager, param, commandType: CommandType.StoredProcedure).ToList();
                return customerData;
            }
        }

        public ClientViewModel Find(long clientId)
        {
            ClientViewModel clientViewModel = new ClientViewModel();
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@ClientId", clientId);
                param.Add("@Action", ActionFlag.Find);
                var reader  = dbConnection.QueryMultiple(PROC_ClientLookupManager, param, commandType: CommandType.StoredProcedure);

                clientViewModel.ClientMaster = reader.Read<ClientMaster>().FirstOrDefault();
                clientViewModel.OrganizationMaster = reader.Read<OrganizationMaster>().FirstOrDefault();
                clientViewModel.ContactPersonMasters = reader.Read<ContactPersonMaster>().AsList();
            }
            return clientViewModel;
        }
        public ResponseCode Delete(ClientMaster Customer)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Delete");
                param.Add("@CustomerId", Customer.ClientId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_ClientLookupManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }
    }
}
