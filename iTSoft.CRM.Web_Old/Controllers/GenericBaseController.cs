using iTSoft.CRM.Domain.Services;
using System;
using Serilog;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Web.Helpers;
using iTSoft.CRM.Data.Entity;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Controllers
{

    public class GenericBaseController<TEntity> : ControllerBase where TEntity : class
    {
        public IGenericService<TEntity> genericService;
        public readonly ILogger _logger;

        public GenericBaseController()
        {
            genericService = new GenericService<TEntity>();
            _logger = Logger.GetLogger();
        }

      


        [HttpPost("add")]
        public IActionResult Add( TEntity entity)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = genericService.Add(entity) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Base - Add");
            }
            return Ok(response);
        }


        [HttpPost("update")]
        public IActionResult Update( TEntity entity)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = genericService.Update(entity) ? ResponseCode.Success : ResponseCode.DataBaseError;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Base - Update");
            }

            return Ok(response);
        }


        [HttpPost("delete")]
        public IActionResult Delete( TEntity entity)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseCode = genericService.Delete(entity) ? ResponseCode.Success : ResponseCode.DataBaseError;
            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Base - Delete");
            }

            return Ok(response);
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                response.ResponseData = genericService.GetAll();
                response.ResponseCode = response.ResponseData != null ? ResponseCode.Success : ResponseCode.DataBaseError;


            }
            catch (Exception ex)
            {
                response.ResponseCode = ResponseCode.ApplicationError;
                _logger.Error(ex, "Base - GetAll");
            }

            return Ok(response);
        }
    }
}
