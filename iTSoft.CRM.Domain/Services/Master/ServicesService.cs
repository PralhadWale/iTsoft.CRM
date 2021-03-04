using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity.Master;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Master
{
    public class ServicesService : GenericRepository<ServiceMaster>
    {
        public const string PROC_SERVICEMANAGER = "PROC_SERVICEMANAGER";
        public List<ServiceDetails> SearchServices(ServiceMaster serviceMaster)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                DynamicParameters param = new DynamicParameters(serviceMaster);
                param.Add("Action", "Search");
                return dbConnection.Query<ServiceDetails>(PROC_SERVICEMANAGER, param, commandType: CommandType.StoredProcedure).AsList();
            }
        }
    }
}
