using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iTSoft.CRM.Domain.Services;

namespace iTSoft.CRM.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginDetailService _iLoginDetailService;
        public LoginController(ILoginDetailService iLoginDetailService)
        {
            _iLoginDetailService = iLoginDetailService;
        }

        [HttpGet("get-login-detail-by-id/{Id}")]
        public async Task<IActionResult> GetLoginDetailById(int Id)
        {
            var result = await _iLoginDetailService.GetLoginDetailsByLoginId(Id);
            return Ok(result);
        }

        [HttpGet("get-login-detail/{userName}/{password}")]
        public IActionResult GetLoginDetail(string userName, string password)
        {
            var result = _iLoginDetailService.GetLoginDetails(userName, password);
            return Ok(result);
        }

    }
}
