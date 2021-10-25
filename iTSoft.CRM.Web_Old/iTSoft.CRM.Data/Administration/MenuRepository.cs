using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace iTSoft.CRM.Data.Administration
{
    public class MenuRepository : BaseRepository
    {

        public const string PROC_ADM_MenuManager = "PROC_ADM_MenuManager";

        public ResponseCode AddUpdateMenu(MenuMaster menuMaster)
        {
            ResponseCode response = ResponseCode.Failed;
            string flag = (menuMaster.MenuIdentity > 0 ? ActionFlag.Update : ActionFlag.Add).ToString();
            DynamicParameters param = new DynamicParameters(menuMaster);
            param.Add("@Action", flag);
            long result = base.ExecuteCommand(PROC_ADM_MenuManager, param);
            if (result > 0)
                response = ResponseCode.Success;
            else if (result == 0 && menuMaster.MenuId > 0)
                response = ResponseCode.NotFound;

            return response;
        }

        public ResponseCode DeleteMenu(long menuIdentity)
        {
            ResponseCode response = ResponseCode.Failed;

            DynamicParameters param = new DynamicParameters();
            param.Add("@Action", ActionFlag.Delete);
            param.Add("@MenuIdentity", menuIdentity);
            long result = base.ExecuteCommand(PROC_ADM_MenuManager, param);
            if (result > 0)
                response = ResponseCode.Success;

            return response;
        }

        public List<MenuDetails> LoadUserMenu(long userId)
        {
            List<MenuDetails> result = null;
            DynamicParameters param = new DynamicParameters();
            param.Add("@UserId", userId);
            param.Add("@Action", ActionFlag.MenusByUserId.ToString());
            result = base.QueryList<MenuDetails>(PROC_ADM_MenuManager, param);
            return result;
        }


        public MenuMaster FindMenu(long menuIdentity)
        {
            MenuMaster result = null;
            DynamicParameters param = new DynamicParameters();
            param.Add("@MenuIdentity", menuIdentity);
            param.Add("@Action", ActionFlag.Find.ToString());
            result = base.QueryList<MenuMaster>(PROC_ADM_MenuManager, param).FirstOrDefault();
            return result;
        }


        public List<MenuDetails> ListAllMenu()
        {
            List<MenuDetails> result = null;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Action", ActionFlag.Display.ToString());
            result = base.QueryList<MenuDetails>(PROC_ADM_MenuManager, param);
            return result;
        }

        public List<MenuTreeDetails> ModuleTreeMenuList(long moduleId)
        {

            List<MenuTreeDetails> result = null;
            DynamicParameters param = new DynamicParameters();
            param.Add("@Action", ActionFlag.ModuleTreeMenuList.ToString());
            param.Add("@ModuleId", moduleId);
            result = base.QueryList<MenuTreeDetails>(PROC_ADM_MenuManager, param);
            return result;
        }


        //public List<MenuDetails> LoadUserMenu(long userId)
        //{

        //}

    }
}
