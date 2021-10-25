using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace iTSoft.CRM.Data.Core
{
    public interface IConnectionFactory
    {
        IDbConnection GetConnection();
    }
}
