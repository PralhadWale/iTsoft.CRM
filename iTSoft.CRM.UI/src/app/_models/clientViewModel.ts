import { ClientMaster } from "./clientMaster";
import { ContactPersonMaster } from "./contactPerson";
import { OrganizationMaster } from "./organization";

export class ClientViewModel {
    ClientMaster: ClientMaster;
    OrganizationMaster: OrganizationMaster;
    ContactPersonMaster: ContactPersonMaster;
    ContactPersonMasters: ContactPersonMaster[];

    constructor()
    {
        this.ClientMaster = new ClientMaster();
        this.OrganizationMaster = new OrganizationMaster();
        this.ContactPersonMaster = new ContactPersonMaster();
        this.ContactPersonMasters = [];
    }
}