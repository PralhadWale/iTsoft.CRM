using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Domain.Services.Process;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTSoft.CRM.Web.Area.Process.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : BaseController
    {
        private readonly ILogger _logger;

        IDashboardService dashboardService = null;
        public DashboardController(IDashboardService _dashboardService)
        {
            _logger = Logger.GetLogger();
            dashboardService = _dashboardService;
        }

        [HttpPost("GetLeadSourceDashboard")]
        public async Task<IActionResult> GetLeadSourceDashboard(DashboardSearchParameters dashboardSearchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = await dashboardService.GetLeadSourceDashboard(dashboardSearchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Dashboard - GetLeadSourceDashboard");
            }
            return Ok(response);
        }


        [HttpPost("GetLeadStatusDashboard")]
        public async Task<IActionResult> GetLeadStatusDashboard(DashboardSearchParameters dashboardSearchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = await dashboardService.GetLeadStatusDashboard(dashboardSearchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Dashboard - GetLeadStatusDashboard");
            }
            return Ok(response);
        }

        [HttpPost("GetRevenueTargetDashboard")]
        public async Task<IActionResult> GetRevenueTargetDashboard(DashboardSearchParameters dashboardSearchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = await dashboardService.GetRevenueTargetDashboard(dashboardSearchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Dashboard - GetRevenueTargetDashboard");
            }
            return Ok(response);
        }


        [HttpPost("GetTopNEmployeeDashboard")]
        public async Task<IActionResult> GetTopNEmployeeDashboard(DashboardSearchParameters dashboardSearchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = await dashboardService.GetTopNEmployeeDashboard(dashboardSearchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Dashboard - GetTopNEmployeeDashboard");
            }
            return Ok(response);
        }

        [HttpPost("GetDepartmentWiseRevenueDashboard")]
        public async Task<IActionResult> GetDepartmentWiseRevenueDashboard(DashboardSearchParameters dashboardSearchParameters)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseData = await dashboardService.GetDepartmentWiseRevenueDashboard(dashboardSearchParameters);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Dashboard - GetDepartmentWiseRevenueDashboard");
            }
            return Ok(response);
        }
    }
    }
