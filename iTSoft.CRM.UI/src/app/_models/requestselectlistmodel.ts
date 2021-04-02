import { StatusMaster } from '../masters/status/status.model';
import { ListModel } from './listmodel';

export class RequestSelectListModel
{
    LeadStatuses: StatusMaster[];
    Stages: ListModel[];
    Sources: ListModel[];
    ClientBehaviour: ListModel[];
    Advisors : ListModel[];
    Departments : ListModel[];
    OrganizationTypes : ListModel[];
    Services: ListModel[];
    constructor()
    {
        this.LeadStatuses=[];
        this.Stages=[];
        this.Sources=[];
        this.ClientBehaviour=[];
        this.Advisors = [];
        this.Departments = [];
        this.OrganizationTypes = [];
        this.Services = [];
    }
}