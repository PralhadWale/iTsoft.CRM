using iTSoft.CRM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTSoft.CRM.Data.Core
{
    public class ConnectionFactory : IConnectionFactory
    {

        //private readonly DbProviderFactory providerFactory;
        public ConnectionFactory()
        {
            //providerFactory = DbProviderFactories.GetFactory("System.Data.SqlClient");
        }

        public IDbConnection GetConnection()
        {

            var conn = new SqlConnection();
            conn.ConnectionString = ApplicationSettings.ConnectionString;
            return conn;
        }
    }
}
