using iTSoft.CRM.Data.Core;
using System;
using System.Collections.Generic;
using System.Data;
using Dapper;
using Dapper.Contrib.Extensions;
using System.Text;

namespace iTSoft.CRM.Data.Core
{
    public class GenericRepository<TEntity> : BaseRepository, IGenericRepository<TEntity> where TEntity : class
    {
        public long Add(TEntity entity)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                return dbConnection.Insert(entity);
            }
        }

        public bool Update(TEntity entity)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                return dbConnection.Update(entity);
            }

        }

        public bool Delete(TEntity entity)
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                return dbConnection.Delete(entity);
            }

        }

        public IEnumerable<TEntity> GetAll()
        {
            using (IDbConnection dbConnection = base.GetConnection())
            {
                return dbConnection.Query<TEntity>("Select * From " + typeof(TEntity).Name);
            }
        }
    }
}
