using System.Threading.Tasks;
using iTSoft.CRM.Data.Context;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace iTSoft.CRM.Data.Repository
{
    public interface IEmployeeRepository : IRepository<UserDetails>
    {
        /// <summary>
        /// Used to get employee details by id and company id
        /// </summary>
        /// <param name="employeeid"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        Task<UserDetails> getEmployeeByIdAndCompanyId(int employeeid, int companyId);
    }
    public class EmployeeRepository : Repository<UserDetails>, IEmployeeRepository
    {
        private readonly CRMContext _CRMContext;
        public EmployeeRepository(CRMContext CRMContext) : base(CRMContext)
        {
            this._CRMContext = CRMContext;
        }

        /// <summary>
        /// Used to get Employee By employeeId And CompanyId
        /// </summary>
        /// <param name="employeeid"></param>
        /// <param name="companyId"></param>
        /// <returns></returns>
        public async Task<UserDetails> getEmployeeByIdAndCompanyId(int employeeid, int companyId)
        {
            var tt = await (from u in _CRMContext.UserDetails
                            join um in _CRMContext.UserFinancialInvestmentCycleMapping on u.UserId equals um.UserId
                            join cm in _CRMContext.CompanyFinancialMapping on um.CompanyFinancialId equals cm.CompanyFinancialId
                            join c in _CRMContext.CompanyDetails on cm.CompanyId equals c.CompanyId
                            where c.CompanyId == companyId && u.UserId == employeeid
                            select u).ToListAsync();
            return null;
        }
    }
}
