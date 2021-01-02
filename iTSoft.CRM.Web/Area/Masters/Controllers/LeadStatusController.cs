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
    public class LeadStatusController : GenericBaseController<LeadStatusMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(LeadStatusMaster LeadStatus)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (LeadStatus == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (base.genericService.GetAll().Where(c => c.LeadStatusId == LeadStatus.LeadStatusId).Count() == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.LeadStatusName == LeadStatus.LeadStatusName).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(LeadStatus) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("LeadStatus with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.LeadStatusName == LeadStatus.LeadStatusName && c.LeadStatusId != LeadStatus.LeadStatusId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(LeadStatus) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("LeadStatus with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "LeadStatusController - Save");
                return BadRequest("Internal LeadStatus error");

            }
            return Ok(response);
        }
    }
}
