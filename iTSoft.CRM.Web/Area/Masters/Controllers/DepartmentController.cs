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
    public class DepartmentController : GenericBaseController<DepartmentMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(DepartmentMaster department)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (department == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (base.genericService.GetAll().Where(c => c.DepartmentId == department.DepartmentId).Count() == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.DepartmentName == department.DepartmentName).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(department) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Department with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.DepartmentName == department.DepartmentName && c.DepartmentId != department.DepartmentId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(department) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Department with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "DepartmentController - Save");
                return BadRequest("Internal Department error");

            }
            return Ok(response);
        }
    }
}
