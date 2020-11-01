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
    public class EmployeeMasterRepository : BaseRepository
    {
        public IDbConnection dbConnection;
        public EmployeeMasterRepository()
        {
            dbConnection = base.GetConnection();
        }
        private const string PROC_EmployeeManager = "PROC_EmployeeManager";

        public ResponseCode Save(EmployeeMaster employeeMaster)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = employeeMaster.EmployeeId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(employeeMaster);
                param.Add("@Action", flag);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }

        public List<EmployeeMaster> GetAll()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "SearchEmployee");
                List<EmployeeMaster> employeeData = dbConnection.Query<EmployeeMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).ToList();
                return employeeData;
            }
        }

        public List<EmployeeMaster> GetEmployeeInfo(EmployeeMaster searchParam)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(searchParam);
                param.Add("@Action", "SearchEmployee");
                List<EmployeeMaster> employeeData = dbConnection.Query<EmployeeMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).ToList();
                return employeeData;
            }
        }

        public EmployeeMaster Find(long EmployeeId)
        {
            EmployeeMaster result;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@EmployeeId", EmployeeId);
                param.Add("@Action", ActionFlag.Find);
                result = dbConnection.Query<EmployeeMaster>(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }
        public ResponseCode Delete(EmployeeMaster employeeMaster)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Delete");
                param.Add("@EmployeeId", employeeMaster.EmployeeId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_EmployeeManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }
    }
}
