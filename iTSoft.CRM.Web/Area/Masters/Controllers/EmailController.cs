using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Core.Cryptography;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Web.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace iTSoft.CRM.Web.Area.Masters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmailController : GenericBaseController<EmailMaster>
    {
        [HttpPost("save")]
        public IActionResult Save(EmailMaster Email)
        {
            ServiceResponse response = new ServiceResponse();
            try
            {
                Email.Password = "123456789";
                Email.Password = new EncryptionHelper().Encrypt(Email.Password);
                if (Email == null)
                {
                    return BadRequest("Invalid input data");
                }

                if (base.genericService.GetAll().Where(c => c.EmailId == Email.EmailId).Count() == 0)
                {

                    if (base.genericService.GetAll().Where(c => c.Email.ToUpper() == Email.Email.ToUpper()).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Add(Email) > 0 ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Email with same name already exists");
                    }
                }
                else
                {
                    if (base.genericService.GetAll().Where(c => c.Email.ToUpper() == Email.Email.ToUpper() && c.EmailId != Email.EmailId).Count() == 0)
                    {
                        response.ResponseCode = base.genericService.Update(Email) == true ? ResponseCode.Success : ResponseCode.DataBaseError;
                    }
                    else
                    {
                        return BadRequest("Email with same name already exists");
                    }
                }
            }
            catch (Exception ex)
            {
                base._logger.Error(ex, "EmailController - Save");
                return BadRequest("Internal Email error");

            }
            return Ok(response);
        }


        [HttpGet("list")]
        public IActionResult List()
        {
            var emailList = base.genericService.GetAll();

            foreach(var email in emailList)
            {
                email.Password = new EncryptionHelper().Decrypt(email.Password);
            }
            ServiceResponse response = new ServiceResponse();
            response.ResponseData = emailList;
            response.ResponseCode = ResponseCode.Success;
            return Ok(response);
        }
    }
}


