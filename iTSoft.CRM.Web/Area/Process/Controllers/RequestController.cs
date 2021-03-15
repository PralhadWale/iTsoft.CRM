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
    public class RequestController : ControllerBase
    {
        private readonly ILogger _logger;

        IRequestService requestService = null;
        public RequestController(IRequestService _requestService)
        {
            _logger = Logger.GetLogger();
            requestService = _requestService;
        }

        [HttpPost("save")]
        public IActionResult Save(RequestViewModel requestViewModel)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
            
                response.ResponseData = requestService.SaveRequest(requestViewModel);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - SaveRequest");
            }
            return Ok(response);
        }

        [HttpPost("assign")]
        public IActionResult  AssignRequest(List<AssignAdvisorViewModel> assignAdvisorViewModels)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = requestService.AssignRequest(assignAdvisorViewModels);
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

                response.ResponseData = requestService.SearchRequest(requestSerchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - SearchRequest");
            }
            return Ok(response);
        }

        [HttpGet("load")]
        public IActionResult Load(long requestId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = requestService.LoadRequest(requestId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - LoadRequest");
            }
            return Ok(response);
        }

        [HttpGet("loadrequestservice")]
        public IActionResult LoadRequestServiceDetails(long requestServiceId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = requestService.LoadRequestServiceDetails(requestServiceId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - LoadRequest");
            }
            return Ok(response);
        }

        [HttpGet("getnextrequestnumber")]
        public IActionResult GetNextRequestNumber(long requestTypeId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = requestService.GetNextrequestNumber(requestTypeId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Request - LoadRequest");
            }
            return Ok(response);
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = "Test";
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
