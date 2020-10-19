using AutoMapper;
using iTSoft.CRM.Data.Context;
using iTSoft.CRM.Domain.Models;

namespace iTSoft.CRM.Domain.Mapping
{
    public class CRMMapping: Profile
    {
        public CRMMapping()
        {
            CreateMap<UserDetails, LoginDetailViewModel>().ReverseMap();
            CreateMap<UserDetails, UserDetailsViewModel>().ReverseMap();
         



        }
    }
}
