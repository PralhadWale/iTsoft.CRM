using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using iTSoft.CRM.Web.Helpers;
using iTSoft.HIMS.Service.Shared;
using iTSoft.CRM.Domain.Models.ViewModel;
using iTSoft.CRM.Data.Entity.Master;

namespace iTSoft.CRM.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListController : ControllerBase
    {

        private readonly ILogger _logger;

        IListService _listService = null;
        public ListController(IListService listService)
        {
            _logger = Logger.GetLogger();
            _listService = listService;
        }

        [HttpGet("get-request-select-list")]
        public IActionResult GetRequestSelectList()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
               
                RequestSelectListModel requestSelectListModel = new RequestSelectListModel();
                requestSelectListModel.ClientBehaviour = _listService.ListAll<ClientBehaviourMaster>(nameof(ClientBehaviourMaster.ClientBehaviourName), nameof(ClientBehaviourMaster.ClientBehaviourId));
                requestSelectListModel.LeadStatuses = _listService.ListAll<LeadStatusMaster>(nameof(LeadStatusMaster.LeadStatusName), nameof(LeadStatusMaster.LeadStatusId));
                requestSelectListModel.Sources = _listService.ListAll<LeadSourceMaster>(nameof(LeadSourceMaster.LeadSourceName), nameof(LeadSourceMaster.LeadSourceId));
                requestSelectListModel.Stages = _listService.ListAll<StageMaster>(nameof(StageMaster.StageName), nameof(StageMaster.StageId));
                requestSelectListModel.Departments = _listService.ListAll<DepartmentMaster>(nameof(DepartmentMaster.DepartmentName), nameof(DepartmentMaster.DepartmentId));

                response.ResponseData = requestSelectListModel;
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                return Ok(ex.ToString());
            }
            return Ok(response);
        }


        [HttpGet("get-followup-select-list")]
        public IActionResult GetFollowupSelectList()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                RequestSelectListModel requestSelectListModel = new RequestSelectListModel();
                requestSelectListModel.ClientBehaviour = _listService.ListAll<ClientBehaviourMaster>(nameof(ClientBehaviourMaster.ClientBehaviourName), nameof(ClientBehaviourMaster.ClientBehaviourId));
                requestSelectListModel.LeadStatuses = _listService.ListAll<LeadStatusMaster>(nameof(LeadStatusMaster.LeadStatusName), nameof(LeadStatusMaster.LeadStatusId));
                requestSelectListModel.Stages = _listService.ListAll<StageMaster>(nameof(StageMaster.StageName), nameof(StageMaster.StageId));

                response.ResponseData = requestSelectListModel;
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetFollowupSelectList");
            }
            return Ok(response);
        }

        [HttpGet("get-employee-select-list")]
        public IActionResult GetEmployeeSelectList()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                EmployeeSelectListModel employeeSelectListModel = new EmployeeSelectListModel();
                employeeSelectListModel.Roles = _listService.ListAll<IdentityRole>(nameof(IdentityRole.Name), nameof(IdentityRole.RoleId));
                employeeSelectListModel.Designations = _listService.ListAll<DesignationMaster>(nameof(DesignationMaster.DesignationName), nameof(DesignationMaster.DesignationId));
                employeeSelectListModel.Departments = _listService.ListAll<DepartmentMaster>(nameof(DepartmentMaster.DepartmentName), nameof(DepartmentMaster.DepartmentId));

                response.ResponseData = employeeSelectListModel;
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetEmployeeSelectList");
            }
            return Ok(response);
        }

        [HttpGet("get-advisor-select-list")]
        public IActionResult GetAdvisorSelectList()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = _listService.GetAdvisors();
               response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetAdvisorSelectList");
            }
            return Ok(response);
        }


        [HttpGet("get-client-select-list")]
        public IActionResult GetClientSelectList()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = new
                {
                    Advisors = _listService.GetAdvisors(),
                    Departments = _listService.ListAll<DepartmentMaster>(nameof(DepartmentMaster.DepartmentName), nameof(DepartmentMaster.DepartmentId))
                };
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetClientSelectList");
            }
            return Ok(response);
        }


        [HttpGet("get-department-advisor-list")]
        public IActionResult GetDepartmentAdvisors(int departmentId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = _listService.GetDepartmentAdvisors(departmentId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetDepartmentAdvisors");
            }
            return Ok(response);
        }


        [HttpGet("get-user-department-list")]
        public IActionResult GetUserDepartments(int userId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = _listService.GetUserDepartments(userId);
                response.ResponseCode = ResponseCode.Success;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "List - GetUserDepartments");
            }
            return Ok(response);
        }

    }
}
