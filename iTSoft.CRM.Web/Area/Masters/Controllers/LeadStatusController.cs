using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Web.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeadStatusController : GenericBaseController<LeadStatusMaster>
    {

    }
}
