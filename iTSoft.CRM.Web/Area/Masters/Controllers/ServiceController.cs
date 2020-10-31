using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Web.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceController : GenericBaseController<ServiceMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(ServiceMaster service)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                if (service.ServiceId == 0)
                {
                    response.ResponseCode = base.genericService.Add(service) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                }
                else
                {
                    response.ResponseCode = base.genericService.Update(service)  == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                }
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                base._logger.Error(ex, "ServiceController - Save");
            }
            return Ok(response);
        }
    }
}
