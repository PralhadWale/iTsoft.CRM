using Dapper;
using iTSoft.CRM.Data.Core;
using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Shared;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace iTSoft.CRM.Data.Administration
{
   public class RoleRepository : BaseRepository
    {

        public const string PROC_ADM_RoleManager = "PROC_ADM_RoleManager";


        public ResponseCode AddUpdateRole(IdentityRoleVM identityRoleVM)
        {
                ListConverter listConverter = new ListConverter();
                DataTable rolesMenuDataTable = listConverter.ToDataTable<IdentityRoleMenu>(identityRoleVM.rolesMenu);
                DynamicParameters dyn = new DynamicParameters();

                dyn.Add("@RoleId", identityRoleVM.RoleId);
                dyn.Add("@Name", identityRoleVM.Name);
                dyn.Add("@AddedBy", identityRoleVM.AddedBy);
                dyn.Add("@AddedDate", identityRoleVM.AddedDate);
                dyn.Add("@UpdatedBy", identityRoleVM.UpdatedBy);
                dyn.Add("@UpdatedDate", identityRoleVM.UpdatedDate);

                dyn.Add("@RolesMenu", rolesMenuDataTable.AsTableValuedParameter("IdentityRoleMenuType"));
                dyn.Add("@Action", identityRoleVM.RoleId > 0 ? ActionFlag.Update : ActionFlag.Add);
                dyn.Add("@DbResult", dbType: DbType.Int64, direction: ParameterDirection.InputOutput);

                int i = base.ExecuteCommand(PROC_ADM_RoleManager, dyn, commandTimeout: 0);
                var result = dyn.Get<long>("@DbResult");
                return (ResponseCode)result;
        }

        public List<IdentityRoleMenu> GetMenusByRoleId(long roleId)
        {

            DynamicParameters param = new DynamicParameters();
            param.Add("@RoleId", roleId);
            param.Add("@Action", ActionFlag.MenusByRoleId.ToString());
            return base.QueryList<IdentityRoleMenu>(PROC_ADM_RoleManager, param, commandTimeout: 0);
        }

        public List<IdentityRole> GetAllRoles()
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Action", ActionFlag.Display.ToString());
            return base.QueryList<IdentityRole>(PROC_ADM_RoleManager, param);
        }

        public List<MenuMaster> GetAllMenus()
        {
            DynamicParameters param = new DynamicParameters();
            param.Add("@Action", ActionFlag.RoleAllMenuList.ToString());
            return base.QueryList<MenuMaster>(PROC_ADM_RoleManager, param);
        }
    }
}
