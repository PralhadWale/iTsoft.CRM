import { ListModel } from './listmodel';

export class RequestSelectListModel
{
    LeadStatuses: ListModel[];
    Stages: ListModel[];
    Sources: ListModel[];
    ClientBehaviour: ListModel[];
    constructor()
    {
        this.LeadStatuses=[];
        this.Stages=[];
        this.Sources=[];
        this.ClientBehaviour=[];
    }
}