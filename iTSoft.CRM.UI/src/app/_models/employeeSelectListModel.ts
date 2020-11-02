import { ListModel } from './listmodel';

export class EmployeeSelectListModel
{
    Roles: ListModel[];
    Designations: ListModel[];
   
    constructor()
    {
        this.Roles=[];
        this.Designations=[];
    }
}