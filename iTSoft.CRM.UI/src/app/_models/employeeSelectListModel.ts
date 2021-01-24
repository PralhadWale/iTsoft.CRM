import { ListModel } from './listmodel';

export class EmployeeSelectListModel
{
    Roles: ListModel[];
    Designations: ListModel[];
    Departments : ListModel[];
   
    constructor()
    {
        this.Roles=[];
        this.Designations=[];
        this.Departments=[];
    }
}