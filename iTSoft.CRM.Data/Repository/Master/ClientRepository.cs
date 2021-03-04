using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
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

        public ResponseCode Save(ClientMaster Customer)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = Customer.ClientId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(Customer);
                param.Add("@Action", flag);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_ClientManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }

        public List<ClientDetails> SearchClient(ClientDetails clientMaster)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(clientMaster);
                param.Add("@Action", "Search");
                List<ClientDetails> customerData = dbConnection.Query<ClientDetails>(PROC_ClientManager, param, commandType: CommandType.StoredProcedure).ToList();
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
                List<ClientMaster> customerData = dbConnection.Query<ClientMaster>(PROC_ClientManager, param, commandType: CommandType.StoredProcedure).ToList();
                return customerData;
            }
        }

        public ClientMaster Find(long clientId)
        {
            ClientMaster result;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@ClientId", clientId);
                param.Add("@Action", ActionFlag.Find);
                result = dbConnection.Query<ClientMaster>(PROC_ClientManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
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
                dbConnection.Execute(PROC_ClientManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }
    }
}
