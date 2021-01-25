using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using iTSoft.CRM.Domain.Services;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Web.Helpers;
using System.Security.Claims;

namespace iTSoft.CRM.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILoginDetailService _iLoginDetailService;
        public AccountController(ILoginDetailService iLoginDetailService)
        {
            _iLoginDetailService = iLoginDetailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel loginModel)
        {
           // throw new Exception("Test");
                loginModel.Password = new EncryptionHelper().Encrypt(loginModel.Password);
                var result = await _iLoginDetailService.VerifyUser(loginModel);
                if (result != null)
                {
                    result.Token = SetTokenData(result);
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Invalid username or password");
                }
                
        }



        private string SetTokenData(IdentityUserDetails userDetails)
        {
            List<Claim> userClaims = new List<Claim> {
                    new Claim(ClaimTypes.Name, userDetails.UserName),
                    new Claim(ClaimTypes.Sid, userDetails.UserId.ToString()),
                    new Claim(ClaimTypes.Role, userDetails.RoleId.ToString()),
                    new Claim(ClaimTypes.Actor , userDetails.RoleId.ToString())
                };

            var token = new JwtTokenBuilder()
                                 .AddSecurityKey(JwtSecurityKey.Create(ApplicationSettings.TokenSymetricKey))
                                 .AddSubject(userDetails.UserName)
                                 .AddIssuer(ApplicationSettings.TokenIssuer)
                                 .AddAudience(ApplicationSettings.TokenAudience)
                                 .AddClaims(userClaims)
                                 .AddExpiry(1740)
                                 .Build();
            return token.Value;

        }


        [HttpPost("dashboarddata")]
        public IActionResult DasbhoardData(LoginModel loginModel)
        {

            var result = _iLoginDetailService.VerifyUser(loginModel);
            return Ok(result);
        }

    }
}
