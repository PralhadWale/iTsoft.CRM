using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services
{
    public interface IGenericService<TEntity> where TEntity : class
    {

        long Add(TEntity entity);
        bool Delete(TEntity entity);
        bool Update(TEntity entity);
        IEnumerable<TEntity> GetAll();
    }
}
