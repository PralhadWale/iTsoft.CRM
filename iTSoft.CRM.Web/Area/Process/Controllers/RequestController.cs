using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace iTSoft.CRM.Web.Area.Process.Controllers
{
    public class RequestController : GenericBaseController<RequestMaster>
    {
        private readonly ILogger _logger;

        IListService _listService = null;
        public RequestController(IListService listService)
        {
            _logger = Logger.GetLogger();
            _listService = listService;
        }

        [HttpPost("SaveRequest")]
        public IActionResult SaveRequest(RequestViewModel requestViewModel)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
            
                response.ResponseData = requestSelectListModel;
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetRequestSelectList");
            }
            return Ok(response);
        }
    }
}
