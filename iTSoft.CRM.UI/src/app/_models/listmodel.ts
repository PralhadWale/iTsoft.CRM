export class ListModel
{
    Text: string;
    Value: number;
}

export class ListModelWithForeignKey extends ListModel
{
    ForeignKey: number;
}