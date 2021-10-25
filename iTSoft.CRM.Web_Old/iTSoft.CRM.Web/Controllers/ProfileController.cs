using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Domain.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iTSoft.CRM.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;

        public ProfileController(IProfileService profileService)
        {
            _profileService = profileService;
        }
        
        [HttpGet("userevenuedashboard")]
        public async Task<IActionResult> UseRevenueDashboard(long userId)
        {
            if (userId < 1)
            {
                return BadRequest("Invalid user details");
            }
            else
            {
                var dashboardData = await _profileService.UseRevenueDashboard(userId);
                if (dashboardData == null)
                {
                    return BadRequest("Error while processing request");
                }
                else
                {
                    return Ok(dashboardData);
                }
            }
        }
    }
}
