import { ListModel } from './listmodel';

export class RequestSelectListModel
{
    LeadStatuses: ListModel[];
    Stages: ListModel[];
    Sources: ListModel[];
    ClientBehaviour: ListModel[];
    Advisors : ListModel[];
    Departments : ListModel[];
    OrganizationTypes : ListModel[];
    constructor()
    {
        this.LeadStatuses=[];
        this.Stages=[];
        this.Sources=[];
        this.ClientBehaviour=[];
        this.Advisors = [];
        this.Departments = [];
        this.OrganizationTypes = [];
    }
}