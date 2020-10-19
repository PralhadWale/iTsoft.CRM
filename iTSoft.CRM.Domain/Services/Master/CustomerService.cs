using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Repository.Master;
using iTSoft.CRM.Data.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Master
{
    public class CustomerService
    {
        CustomerRepository CustomerRepository = null;

        public CustomerService()
        {
            CustomerRepository = new CustomerRepository();
        }
        public ResponseCode Save(CustomerMaster Customer)
        {
            return CustomerRepository.Save(Customer);
        }

        public List<CustomerMaster> GetAll()
        {
            return CustomerRepository.GetAll();
        }

        public List<CustomerMaster> GetCustomerInfo(EmployeeMasterSearchParam searchParam)
        {
            return CustomerRepository.GetCustomerInfo(searchParam);
        }

        public CustomerMaster Find(long CustomerId)
        {
            return CustomerRepository.Find(CustomerId);
        }
        public ResponseCode Delete(CustomerMaster Customer)
        {
            return CustomerRepository.Delete(Customer);
        }
    }
}
