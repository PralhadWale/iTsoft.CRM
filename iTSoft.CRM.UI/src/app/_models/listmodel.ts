export class ListModel
{
    Text: string;
    Value: string;
}

export class ListModelWithForeignKey extends ListModel
{
    ForeignKey: string;
}