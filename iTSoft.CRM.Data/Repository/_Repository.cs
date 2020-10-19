using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Context;

namespace iTSoft.CRM.Data.Repository
{
    public interface IRepository<T> where T: class
    {
        Task<T> Get(int id);
        Task<List<T>> GetAllList ();

        IQueryable<T> GetAll(bool asNoTracking = true);

        Task<ICollection<T>> GetAllAsync (bool asNoTracking = true);

        Task Add(T entity);
        void Update(T entity);
    }

    public class Repository<T>:IRepository<T> where T: class
    {
        private readonly CRMContext _CRMContext;
        private readonly DbSet<T> dbSet;

        public Repository(CRMContext CRMContext)
        {
            this._CRMContext = CRMContext;
            this.dbSet = this._CRMContext.Set<T>();
        }

        public async Task<T> Get(int id)
        {
            return await this.dbSet.FindAsync(id);
        }

        public async Task<List<T>> GetAllList()
        {
            IQueryable<T> query = dbSet;
            return await query.ToListAsync();
        }

        public IQueryable<T> GetAll(bool asNoTracking = true)
        {
            var entitySet = GetEntitySet(asNoTracking);
            return entitySet;
        }

        public virtual async Task<ICollection<T>> GetAllAsync(bool asNoTracking = true)
        {
            return await GetEntitySet(asNoTracking).ToListAsync();
        }

        public async Task Add(T entity)
        {
            await dbSet.AddAsync(entity);
            _CRMContext.SaveChanges();
        }

        public void Update(T entity)
        {
            dbSet.Update(entity);
            _CRMContext.SaveChanges();
        }

        private IQueryable<T> GetEntitySet(bool asNoTracking = true)
        {
            if (!asNoTracking)
                return _CRMContext.Set<T>();

            return _CRMContext.Set<T>().AsNoTracking();
        }
    }
}
