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
using iTSoft.Communication.Service.Helpers;
using iTSoft.CRM.Core.Helpers;
using iTSoft.CRM.Domain.Models;
using iTSoft.Communication.Models;
using iTSoft.CRM.Core.Cryptography;

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


        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword(LoginModel loginModel)
        {
            // throw new Exception("Test");
            loginModel.Password = new EncryptionHelper().Encrypt(loginModel.Password);
            var result = await _iLoginDetailService.ResetPassword(loginModel);
            if (result == ResponseCode.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("User not found.Invalid user details");
            }

        }


        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(LoginModel loginModel)
        {
            // throw new Exception("Test");
            loginModel.Password = new EncryptionHelper().Encrypt(loginModel.Password);
            loginModel.NewPassword = new EncryptionHelper().Encrypt(loginModel.NewPassword);
            var result = await _iLoginDetailService.ChangePassword(loginModel);
            if (result == ResponseCode.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Please enter valid old password");
            }

        }

        [HttpGet("verifyaccount")]
        public async Task<IActionResult> VerifyAccount(string userName)
        {
            UserMasterVM user = await _iLoginDetailService.FindUser(userName);
            if (user != null)
            {
                LoginModel loginModel = new LoginModel();
                OTPGenerator oTPGenerator = new OTPGenerator();
                string OTP = oTPGenerator.GenerateOTP();
                NotificationHelper notificationHelper = new NotificationHelper(NotificationTemplateList.EmailTemplateMasters, NotificationTemplateList.SMSTemplateMaster);
                user.OTP = OTP;
                notificationHelper.SendNotification<UserMasterVM>(user, TemplateType.SendOTP, user.Email, user.MobileNo, true, null);

                loginModel.OTP = OTP;
                loginModel.UserID = user.UserId;

                if (loginModel != null)
                {
                    await _iLoginDetailService.SaveOTP(loginModel);
                }

                loginModel.OTP = string.Empty;
                return Ok(loginModel);
            }
            else
            {
                return BadRequest("User Not Found");
            }
        }


        [HttpPost("verifyotp")]
        public async Task<IActionResult> VerifyOTP(LoginModel loginModel)
        {
            var result = await _iLoginDetailService.VerifyOTP(loginModel);
            if (result == ResponseCode.Success)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("User not found.Invalid user details");
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
