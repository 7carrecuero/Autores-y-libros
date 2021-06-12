using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Invoices
    {
        public decimal bllID { get; set; }
        public decimal usrID { get; set; }
        public Nullable<System.DateTime> bll_date { get; set; }
        public string usr_name { get; set; } 
        public string usr_surname { get; set; } 
        public decimal usr_document_number { get; set; }
        public decimal dprd_quantity { get; set; }
        public decimal dprd_price { get; set; }
        public string bll_status { get; set; }
        public Nullable<System.DateTime> bll_create_at { get; set; }
        public Nullable<System.DateTime> bll_update_at { get; set; }
    }
}
