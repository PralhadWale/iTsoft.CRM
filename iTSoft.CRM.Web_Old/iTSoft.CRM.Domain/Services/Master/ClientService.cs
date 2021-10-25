using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.ViewModel;
using iTSoft.CRM.Data.Repository.Master;
using iTSoft.CRM.Data.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Master
{
    public class ClientService
    {
        ClientRepository clientRepository = null;

        public ClientService()
        {
            clientRepository = new ClientRepository();
        }
        public ResponseCode Save(ClientViewModel clientViewModel)
        {
            return clientRepository.Save(clientViewModel);
        }

        public List<ClientDetails> SearchClient(ClientDetails clientMaster)
        {
            return clientRepository.SearchClient(clientMaster);
        }

        public List<ClientMaster> GetCustomerInfo(EmployeeMasterSearchParam searchParam)
        {
            return clientRepository.GetCustomerInfo(searchParam);
        }

        public ClientViewModel Find(long clientId)
        {
            return clientRepository.Find(clientId);
        }
        public ResponseCode Delete(ClientMaster Customer)
        {
            return clientRepository.Delete(Customer);
        }
    }
}
