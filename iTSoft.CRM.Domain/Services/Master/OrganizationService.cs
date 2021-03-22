using iTSoft.CRM.Data.Entity;
using iTSoft.CRM.Data.Entity.Master;
using iTSoft.CRM.Data.Entity.Process;
using iTSoft.CRM.Data.Repository.Master;
using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Services.Master
{
    public class OrganizationService
    {
        OrganizationRepository organizationRepository = null;

        public OrganizationService()
        {
            organizationRepository = new OrganizationRepository();
        }

        public ResponseCode Save(OrganizationMaster organizationMaster)
        {
            return organizationRepository.Save(organizationMaster);
        }

        public List<OrganizationMasterVM> GetAll()
        {
            return organizationRepository.GetAll();
        }
        public ResponseCode Delete(OrganizationMaster organizationMaster)
        {
            return organizationRepository.Delete(organizationMaster);
        }

        public OrganizationMaster FindOrganization(long OrganizationId)
        {
            return organizationRepository.FindOrganization(OrganizationId);
        }
    }
}
