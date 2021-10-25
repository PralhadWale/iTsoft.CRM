using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Repository
{
    public interface IListRepository
    {
        List<ListModel> ListAll<T>(string textField, string valueField, bool activeOnly);
        List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters);
        List<ListModel> ListAll<T>(string textField, string valueField);
        List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey);
        List<ListModel> GetAdvisors();
        List<ListModel> GetDepartmentAdvisors(int departmentId);
        List<ListModel> GetUserDepartments(int userId);
        List<LeadStatusMaster> GetLeadStatusMasters();
    }
    public class ListRepository : BaseRepository , IListRepository
    {
        public const string PROC_ADVISORMANAGER = "PROC_ADVISORMANAGER";
        public const string PROC_EmployeeManager = "PROC_EmployeeManager";
        public List<ListModel> GetAdvisors()
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Action", "ActiveOnly");
            return base.GetConnection().Query<ListModel>(PROC_ADVISORMANAGER, parameters , commandType: System.Data.CommandType.StoredProcedure).AsList();
        }


        public List<ListModel> GetDepartmentAdvisors(int departmentId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("@Action", "DepartmentWise");
            parameters.Add("DepartmentId", departmentId);
            return base.GetConnection().Query<ListModel>(PROC_ADVISORMANAGER, parameters,commandType: System.Data.CommandType.StoredProcedure).AsList();
        }

        public List<ListModel> GetUserDepartments(int userId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("Action", "UserDepartments");
            parameters.Add("EmployeeId", userId);
            return base.GetConnection().Query<ListModel>(PROC_EmployeeManager, parameters, commandType: System.Data.CommandType.StoredProcedure).AsList();
        }

        public  List<LeadStatusMaster> GetLeadStatusMasters()
        {
            return base.GetConnection().Query<LeadStatusMaster>("Select * From " + typeof(LeadStatusMaster).Name + " Where IsActive=1").AsList();
        }

        public List<ListModel> ListAll<T>(string textField, string valueField, dynamic filters)
        {

            string query = "Select " + textField + " as Text," + valueField + " as Value From " + typeof(T).Name;
            if (filters != null)
            {
                IDictionary<string, object> keyValuePairs = filters;
                int i = 0;
                foreach (KeyValuePair<string, object> filter in keyValuePairs)
                {
                    query += i == 0 ? " where " + filter.Key + "=" + filter.Value : " and " + filter.Key + "=" + filter.Value;
                    i++;
                }
            }
            query += "Order by " + textField + " asc";
            return base.GetConnection().Query<ListModel>(query).AsList();
        }

        public List<ListModel> ListAll<T>(string textField, string valueField)
        {
            return base.GetConnection().Query<ListModel>("Select " + textField + " as Text," + valueField + " as Value From " + typeof(T).Name + " Order by " + textField + " asc").AsList();
            // return new List<ListModel>();
        }

        public List<ListModelWithForeignKey> ListAll<T>(string textField, string valueField, string foreignKey)
        {
            return base.GetConnection().Query<ListModelWithForeignKey>("select " + textField + " as Text," + valueField + " as Value," + foreignKey + " as ForeignKey from " + typeof(T).Name + " Order by " + textField + " asc").AsList();
        }

        public List<ListModel> ListAll<T>(string textField, string valueField, bool activeOnly)
        {
            return base.GetConnection().Query<ListModel>("Select " + textField + " as Text," + valueField + " as Value From " + typeof(T).Name + " Where IsActive=1").AsList();
        }
    }
}
