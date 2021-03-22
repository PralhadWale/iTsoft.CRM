using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Data.Repository.Master
{
    public class OrganizationRepository : BaseRepository
    {
        public IDbConnection dbConnection;

        public OrganizationRepository()
        {
            dbConnection = base.GetConnection();
        }
        private const string PROC_OrganizationManager = "PROC_OrganizationManager";
        public ResponseCode Save(OrganizationMaster organizationMaster)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                string flag = organizationMaster.OrganizationId > 0 ? ActionFlag.Update : ActionFlag.Add;
                DynamicParameters param = new DynamicParameters(organizationMaster);
                param.Add("@Action", flag);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_OrganizationManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }

        public List<OrganizationMasterVM> GetAll()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "GetAll");
                List<OrganizationMasterVM> organizationData = dbConnection.Query<OrganizationMasterVM>(PROC_OrganizationManager, param, commandType: CommandType.StoredProcedure).ToList();
                return organizationData;
            }
        }

        public ResponseCode Delete(OrganizationMaster organizationMaster)
        {
            ResponseCode result = ResponseCode.Failed;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@Action", "Delete");
                param.Add("@OrganizationId", organizationMaster.OrganizationId);
                param.Add("@Result", DbType.Int64, direction: ParameterDirection.InputOutput);
                dbConnection.Execute(PROC_OrganizationManager, param, commandType: CommandType.StoredProcedure);
                result = (ResponseCode)param.Get<int>("@Result");
            }
            return result;
        }


        public OrganizationMaster FindOrganization(long OrganizationId)
        {
            OrganizationMaster result;
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters();
                param.Add("@OrganizationId", OrganizationId);
                param.Add("@Action", "FindOrganization");
                result = dbConnection.Query<OrganizationMaster>(PROC_OrganizationManager, param, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            return result;
        }

    }
}
