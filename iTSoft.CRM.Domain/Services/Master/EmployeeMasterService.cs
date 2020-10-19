using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Repository.Master;
using iTSoft.CRM.Data.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Master
{
    public class EmployeeMasterService
    {
        EmployeeMasterRepository employeeMasterRepository = null;

        public EmployeeMasterService()
        {
            employeeMasterRepository = new EmployeeMasterRepository();
        }
        public ResponseCode Save(EmployeeMaster employeeMaster)
        {
            return employeeMasterRepository.Save(employeeMaster);
        }

        public List<EmployeeMaster> GetAll()
        {
            return employeeMasterRepository.GetAll();
        }

        public List<EmployeeMaster> GetEmployeeInfo(EmployeeMasterSearchParam searchParam)
        {
            return employeeMasterRepository.GetEmployeeInfo(searchParam);
        }

        public EmployeeMaster Find(long EmployeeId)
        {
            return employeeMasterRepository.Find(EmployeeId);
        }
        public ResponseCode Delete(EmployeeMaster employeeMaster)
        {
            return employeeMasterRepository.Delete(employeeMaster);
        }
    }
}
