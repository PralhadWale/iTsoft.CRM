using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Domain.Services.Master;
using iTSoft.CRM.Web.Controllers;
using iTSoft.CRM.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    public class OrganizationController : BaseController
    {
        ILogger _logger = null;
        OrganizationService organizationService = null;

        public OrganizationController()
        {
            _logger = Logger.GetLogger();
            organizationService = new OrganizationService();
        }


        [HttpPost]
        public IActionResult Save(OrganizationMaster organizationMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = organizationService.Save(organizationMaster);

            }
            catch (Exception ex)
            {
                _logger.Error(ex, "OrganizationData-Save");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost]
        public IActionResult GetAll()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                var organizationDetails = organizationService.GetAll();
                if (organizationDetails == null || organizationDetails.Count < 1)
                    response.ResponseCode = ResponseCode.NotFound;
                else
                {
                    response.ResponseData = organizationDetails;
                    response.ResponseCode = ResponseCode.Success;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Organization-Search");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpPost]
        public IActionResult Delete(OrganizationMaster organizationMaster)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = organizationService.Delete(organizationMaster);

            }
            catch (Exception ex)
            {
                _logger.Error(ex, "OrganizationData-Delete");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

        [HttpGet]
        public IActionResult FindOrganization(long OrganizationId)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                OrganizationMaster organizationMaster = organizationService.FindOrganization(OrganizationId);
                if (organizationMaster != null)
                {
                    response.ResponseCode = ResponseCode.Success;
                    response.ResponseData = organizationMaster;
                }
                else
                {
                    response.ResponseCode = ResponseCode.NotFound;
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex, "Organization-FindOrganization");
                response.ResponseCode = ResponseCode.ApplicationError;
            }
            return Ok(response);
        }

    }
}
