using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ServiceController : GenericBaseController<ServiceMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(ServiceMaster service)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if(service == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (service.ServiceId == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.ServiceName == service.ServiceName).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(service) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Service with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.ServiceName == service.ServiceName && c.ServiceId != service.ServiceId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(service) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Service with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "ServiceController - Save");
                return BadRequest("Internal service error");

            }
            return Ok(response);
        }
    }
}
