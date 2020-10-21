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
    public class RequestController : BaseController
    {
        private readonly ILogger _logger;

        IRequestService _listService = null;
        public RequestController(IRequestService listService)
        {
            _logger = Logger.GetLogger();
            _listService = listService;
        }

        [HttpPost("save")]
        public IActionResult Save(RequestViewModel requestViewModel)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
            
                response.ResponseData = _listService.SaveRequest(requestViewModel);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - SaveRequest");
            }
            return Ok(response);
        }

        [HttpPost("search")]
        public IActionResult Search(RequestSerchParameters requestSerchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = _listService.SearchRequest(requestSerchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - SearchRequest");
            }
            return Ok(response);
        }

        [HttpGet("load/requestId")]
        public IActionResult Load(long requestId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = _listService.LoadRequest(requestId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - LoadRequest");
            }
            return Ok(response);
        }
    }
}
