using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Shared;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services
{
    public class GenericService<TEntity> : IGenericService<TEntity> where TEntity : class
    {

        public IGenericRepository<TEntity> _repository;

        public GenericService()
        {
            _repository = new GenericRepository<TEntity>();
        }

        public long Add(TEntity entity)
        {
            return _repository.Add(entity);
        }

        public bool Update(TEntity entity)
        {
            return _repository.Update(entity);
        }

        public bool Delete(TEntity entity)
        {
            return _repository.Delete(entity);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return _repository.GetAll();
        }
    }
}
