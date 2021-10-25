using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Data.Entity
{
    public class ListModel
    {
        public string Text { get; set; }
        public long Value { get; set; }
    }

    public class ListModelWithForeignKey : ListModel
    {
        public long ForeignKey { get; set; }
    }
}
