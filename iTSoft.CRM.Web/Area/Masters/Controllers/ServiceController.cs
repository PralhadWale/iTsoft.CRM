using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ServiceController : GenericBaseController<ServiceMaster>
    {

        ILogger _logger = null;
        ServicesService servicesService = null;

        public ServiceController()
        {
            _logger = Logger.GetLogger();
            servicesService = new ServicesService();
        }


        [HttpPost("save")]
        public IActionResult Save(ServiceMaster service)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (service == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (service.ServiceId == 0)
                {

                    if (servicesService.GetAll().Where(c => c.ServiceName == service.ServiceName && c.DepartmentId == service.DepartmentId).Count() == 0)
                    {
                        response.ResponseCode = servicesService.Add(service) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Service with same name already exists");
                    }
                }
                else
                {
                    if (servicesService.GetAll().Where(c => c.ServiceName == service.ServiceName && c.DepartmentId == service.DepartmentId && c.ServiceId != service.ServiceId).Count() == 0)
                    {
                        response.ResponseCode = servicesService.Update(service) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
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


        [HttpPost("search-services")]
        public IActionResult SearchServices(ServiceMaster serviceMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = servicesService.SearchServices(serviceMaster);
                response.ResponseCode = ResponseCode.Success;
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