using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : BaseController
    {
        ILogger _logger = null;
        EmployeeMasterService employeeMasterService = null;
        public EmployeeController()
        {
            _logger = Logger.GetLogger();
            employeeMasterService = new EmployeeMasterService();
        }

        [HttpPost("save")]
        public IActionResult Save(EmployeeDetails employeeDetails)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                employeeDetails.EmployeeMaster.Password = new EncryptionHelper().Encrypt(employeeDetails.EmployeeMaster.Password);
                response.ResponseCode = employeeMasterService.Save(employeeDetails);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-Save");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var employeeDetails = employeeMasterService.GetAll();
                if (employeeDetails == null || employeeDetails.Count < 1)
                    response.ResponseCode = ResponseCode.NotFound;
                else
                {
                    response.ResponseData = employeeDetails;
                    response.ResponseCode = ResponseCode.Success;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-Search");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost("getemployeeinfo")]
        public IActionResult GetEmployeeInfo(EmployeeMaster searchParam)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var employeeDetails = employeeMasterService.GetEmployeeInfo(searchParam);
                
                    response.ResponseData = employeeDetails;
                    response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-GetEmployeeInfo");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpGet("find")]
        public IActionResult Find(long employeeId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                EmployeeDetails employeeDetails = employeeMasterService.Find(employeeId);
                if (employeeDetails.EmployeeMaster != null)
                {
                    employeeDetails.EmployeeMaster.Password = new EncryptionHelper().Decrypt(employeeDetails.EmployeeMaster.Password);
                    response.ResponseCode = ResponseCode.Success;
                    response.ResponseData = employeeDetails;
                }
                else
                {
                    response.ResponseCode = ResponseCode.NotFound;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-Find");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost("delete")]
        public IActionResult Delete(EmployeeMaster employeeMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {

                response.ResponseCode = employeeMasterService.Delete(employeeMaster);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-Delete");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }
    }
}
