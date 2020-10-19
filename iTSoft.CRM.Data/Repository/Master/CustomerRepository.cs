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
    public class CustomerRepository : BaseRepository
    {
        public IDbConnection dbConnection;
        public CustomerRepository()
        {
            dbConnection = base.GetConnection();
        }
        private const string PROC_EmployeeManager = "PROC_EmployeeManager";

        public ResponseCode Save(CustomerMaster Customer)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = Customer.CustomerId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(Customer);
                param.Add("@Action", flag);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }

        public List<CustomerMaster> GetAll()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "SearchEmployee");
                List<CustomerMaster> customerData = dbConnection.Query<CustomerMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).ToList();
                return customerData;
            }
        }

        public List<CustomerMaster> GetCustomerInfo(EmployeeMasterSearchParam searchParam)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@FirstName", searchParam.FirstName);
                param.Add("@MiddleName", searchParam.MiddleName);
                param.Add("@LastName", searchParam.LastName);
                param.Add("@Action", "GetEmployeeInfo");
                List<CustomerMaster> customerData = dbConnection.Query<CustomerMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).ToList();
                return customerData;
            }
        }

        public CustomerMaster Find(long CustomerId)
        {
            CustomerMaster result;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@CustomerId", CustomerId);
                param.Add("@Action", ActionFlag.Find);
                result = dbConnection.Query<CustomerMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }
        public ResponseCode Delete(CustomerMaster Customer)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Delete");
                param.Add("@CustomerId", Customer.CustomerId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }
    }
}
