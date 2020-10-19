using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.ViewModel;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Serilog;
using System;
using System.Web.Http;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    public class EmployeeMasterController : BaseController
    {
        ILogger _logger = null;
        EmployeeMasterService employeeMasterService = null;
        public EmployeeMasterController()
        {
            _logger = Logger.GetLogger();
            employeeMasterService = new EmployeeMasterService();
        }

        [HttpPost]
        public IHttpActionResult Save(EmployeeMaster employeeMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                employeeMaster.Password = EncryptionHelper.Encrypt(employeeMaster.Password);
                response.ResponseCode = employeeMasterService.Save(employeeMaster);
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Employee-Save");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost]
        public IHttpActionResult GetAll()
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

        [HttpPost]
        public IHttpActionResult GetEmployeeInfo(EmployeeMasterSearchParam searchParam)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var employeeDetails = employeeMasterService.GetEmployeeInfo(searchParam);
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
                _logger.Error(ex, "Employee-GetEmployeeInfo");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult Find(long EmployeeId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                EmployeeMaster employeeMaster = employeeMasterService.Find(EmployeeId);
                if (employeeMaster != null)
                {
                    response.ResponseCode = ResponseCode.Success;
                    response.ResponseData = employeeMaster;
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

        [HttpPost]
        public IHttpActionResult Delete(EmployeeMaster employeeMaster)
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
