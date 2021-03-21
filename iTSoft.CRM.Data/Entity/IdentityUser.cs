using iTSoft.CRM.Data.Entity.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class IdentityUser
    {
        public long UserId { get; set; }
        public bool IsEmployee { get; set; }
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTime? LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public long SID { get; set; }
        public long? AddBy { get; set; }
        public DateTime? AddByTime { get; set; }
        public long? EditBy { get; set; }
        public DateTime? EditByTime { get; set; }
        public bool IsActive { get; set; }
        public long? CCode { get; set; }
        public Guid URID { get; set; }
    }

    public class IdentityUserDetails : IdentityUser
    {
        public string ProfileName { get; set; }
        public long RoleId { get; set; }
        public long OrganizationId { get; set; }
        public object Token { get; set; }
        public List<DepartmentMaster> UserDepartments { get; set; }
    }
}
