using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Domain.Services.Process;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace iTSoft.CRM.Web.Area.Process.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowUpController : BaseController
    {
        private readonly ILogger _logger;

        IFollowUpService followUpService = null;
        public FollowUpController(IFollowUpService _followUpService)
        {
            _logger = Logger.GetLogger();
            followUpService = _followUpService;
        }

        [HttpPost("save")]
        public IActionResult Save(FollowUpMaster followupMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseCode = followUpService.SaveFollowUp(followupMaster);
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "FollowUp - SaveFollowUp");
            }
            return Ok(response);
        }

        [HttpPost("assign")]
        public IActionResult Assign(AssignAdvisorViewModel assignAdvisorViewModel)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = followUpService.AssignRequest(assignAdvisorViewModel);
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - SaveRequest");
            }
            return Ok(response);
        }

        [HttpPost("search")]
        public IActionResult Search(FollowUpSerchParameters FollowUpSerchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = followUpService.SearchFollowUp(FollowUpSerchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                //_logger.Error(ex, "FollowUp - SearchFollowUp");
            }
            return Ok(response);
        }
    }
}
