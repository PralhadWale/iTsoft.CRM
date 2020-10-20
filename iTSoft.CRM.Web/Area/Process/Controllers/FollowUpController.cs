using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Domain.Services.Process;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace iTSoft.CRM.Web.Area.Process.Controllers
{
    public class FollowUpController : BaseController
    {
        private readonly ILogger _logger;

        IFollowUpService _listService = null;
        public FollowUpController(IFollowUpService listService)
        {
            _logger = Logger.GetLogger();
            _listService = listService;
        }

        [HttpPost("SaveFollowUp")]
        public IActionResult SaveFollowUp(FollowupMaster followupMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = _listService.SaveFollowUp(followupMaster);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "FollowUp - SaveFollowUp");
            }
            return Ok(response);
        }

        [HttpPost("SearchFollowUp")]
        public IActionResult SearchFollowUp(FollowUpSerchParameters FollowUpSerchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = _listService.SearchFollowUp(FollowUpSerchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "FollowUp - SearchFollowUp");
            }
            return Ok(response);
        }
    }
}
