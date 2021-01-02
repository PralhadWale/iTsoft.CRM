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
    public class LeadSourceController : GenericBaseController<LeadSourceMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(LeadSourceMaster LeadSource)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (LeadSource == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (base.genericService.GetAll().Where(c => c.LeadSourceId == LeadSource.LeadSourceId).Count() == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.LeadSourceName == LeadSource.LeadSourceName).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(LeadSource) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("LeadSource with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.LeadSourceName == LeadSource.LeadSourceName && c.LeadSourceId != LeadSource.LeadSourceId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(LeadSource) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("LeadSource with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "LeadSourceController - Save");
                return BadRequest("Internal LeadSource error");

            }
            return Ok(response);
        }
    }
}
