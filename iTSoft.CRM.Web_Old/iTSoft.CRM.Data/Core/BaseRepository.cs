using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace iTSoft.CRM.Data.Core
{
    public class BaseRepository : ConnectionFactory
    {
        public void ClearCatche()
        {
            try
            {
                SqlMapper.PurgeQueryCache();
            }
            catch (Exception ex)
            {

            }
        }

        public bool Exists(string query)
        {
            using (IDbConnection dbConnection = GetConnection())
            {
                return dbConnection.Query(query).Count() > 0;
            }
        }

        internal int ExecuteCommand(string command, DynamicParameters param, int? commandTimeout = 0, CommandType commandType = CommandType.StoredProcedure)
        {
            using (IDbConnection dbConnection = GetConnection())
            {
                return dbConnection.Execute(command, param, commandTimeout: commandTimeout, commandType: commandType);
            }
        }


        internal List<T> QueryList<T>(string command, DynamicParameters param, int? commandTimeout = default(int?), CommandType commandType = CommandType.StoredProcedure)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                try
                {
                    return dbConnection.Query<T>(command, param, commandType: commandType, commandTimeout: commandTimeout).AsList();
                }
                catch { dbConnection.Close(); throw; }
            }
        }



    }
}
