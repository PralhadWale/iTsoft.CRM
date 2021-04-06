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
    public class StageController : GenericBaseController<StageMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(StageMaster Stage)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                if (Stage == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (Stage.StageId == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.StageName.ToUpper() == Stage.StageName.ToUpper()).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(Stage) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Stage with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.StageName.ToUpper() == Stage.StageName.ToUpper() && c.StageId != Stage.StageId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(Stage) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Stage with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "StageController - Save");
                return BadRequest("Internal Stage error");

            }
            return Ok(response);
        }
    }
}
