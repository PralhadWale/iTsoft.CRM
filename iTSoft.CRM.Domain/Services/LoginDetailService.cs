using AutoMapper;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using iTSoft.CRM.Data.Context;
using iTSoft.CRM.Data.Helpers;
using iTSoft.CRM.Data.Repository;
using iTSoft.CRM.Domain.Models;

namespace iTSoft.CRM.Domain.Services
{
    public interface ILoginDetailService
    {
        /// <summary>
        /// Used to get login details
        /// </summary>
        /// <param name="isActive"></param>
        /// <returns></returns>
        Task<List<LoginDetailViewModel>> GetLoginDetails(bool isActive = true);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="Password"></param>
        /// <returns></returns>
        LoginDetailViewModel GetLoginDetails(string userName, string Password);

        /// <summary>
        /// This method is for Dapper testing, It should be removed...
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        Task<LoginDetailViewModel> GetLoginDetailsByLoginId(int loginId);
    }
    public class LoginDetailService : ILoginDetailService
    {
        private readonly IRepository<LoginDetail> _ILoginDetailRepository;
        private readonly ICRMDapper _CRMDapper;
        private readonly IMapper _iMapper;
        public LoginDetailService(IRepository<LoginDetail> iLoginDetailRepository, ICRMDapper CRMDapper, IMapper iMapper)
        {
            this._ILoginDetailRepository = iLoginDetailRepository;
            this._CRMDapper = CRMDapper;
            this._iMapper = iMapper;
        }

        /// <summary>
        /// Used to get login details
        /// </summary>
        /// <param name="isActive"></param>
        /// <returns></returns>
        public async Task<List<LoginDetailViewModel>> GetLoginDetails(bool isActive = true)
        {
            var result = await _ILoginDetailRepository.GetAllList();
            if (result != null)
            {
                return result.Select(l => new LoginDetailViewModel
                {
                    LoginId = l.LoginId,
                    UserName = l.UserName,
                    Password = l.Password,
                    LoginAttempt = l.LoginAttempt,
                    Otp = l.Otp

                }).ToList();
            }
            return null;
        }


        /// <summary>
        /// Method for Get Login Details
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public LoginDetailViewModel GetLoginDetails(string userName, string password)
        {
            var result = _ILoginDetailRepository.GetAll().FirstOrDefault(l => l.UserName == userName && l.Password == password);

            return result != null ? new LoginDetailViewModel { LoginId = result.LoginId, UserName = result.UserName, Otp = result.Otp } : null;
            
        }

        /// <summary>
        /// Method for Get Login Details By Login Id via Dapper
        /// </summary>
        /// <param name="loginId"></param>
        /// <returns></returns>
        public async Task<LoginDetailViewModel> GetLoginDetailsByLoginId(int loginId)
        {
            var result = await Task.FromResult(_CRMDapper.Get<LoginDetailViewModel>($"Select UserName, Password, Otp from [LoginDetail] where LoginId = {loginId}", null, commandType: CommandType.Text));
            return result;
        }


    }
}
