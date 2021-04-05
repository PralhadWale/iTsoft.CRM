using System;
using System.Collections.Generic;
using System.Text;

namespace iTSoft.CRM.Domain.Models.ViewModel
{
    public class Quote
    {
        public string RequestNumber { get; set; }
        public string RequestDate { get; set; }
        public string BuyerDetails { get; set; }
        public string TOTALDISCOUNT { get; set; }
        public string NETAMOUNT { get; set; }
        public string SUBTOTAL { get; set; }
        public string TOTALGST { get; set; }
        public string GRANDTOTAL { get; set; }
        public string TOTALINWORD { get; set; }
        public List<QuoteItemDetails> QuoteItemDetails { get; set; }
    }

    public class QuoteItemDetails
    {
        public string SRNo { get; set; }
        public string Description { get; set; }
        public string QTY { get; set; }
        public string SERVICEPRICE { get; set; }
        public string SERVICEDISCOUNT { get; set; }
        public string SERVICENETAMOUNT { get; set; }
        public string SERVICETOTALPRICE { get; set; }
        public string SERVICETOTALDISCOUNT { get; set; }
        public string SERVICETOTALNETPRICE { get; set; }

    }
}
