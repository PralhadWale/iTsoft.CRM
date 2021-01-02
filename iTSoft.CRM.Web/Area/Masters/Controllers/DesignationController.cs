using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DesignationController : GenericBaseController<DesignationMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(DesignationMaster Designation)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (Designation == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (base.genericService.GetAll().Where(c => c.DesignationId == Designation.DesignationId).Count() == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.DesignationName == Designation.DesignationName).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(Designation) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Designation with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.DesignationName == Designation.DesignationName && c.DesignationId != Designation.DesignationId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(Designation) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Designation with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "DesignationController - Save");
                return BadRequest("Internal Designation error");

            }
            return Ok(response);
        }
    }
}
