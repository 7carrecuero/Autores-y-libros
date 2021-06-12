using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Products
    {
        public decimal prodID { get; set; }
        public decimal prod_code { get; set; }
        public string prod_name { get; set; }
        public decimal prod_price { get; set; }
        public decimal prod_stock { get; set; }
        public string prod_status { get; set; }
        public Nullable<System.DateTime> prod_create_at { get; set; }
        public Nullable<System.DateTime> prod_update_at { get; set; }
    }
}
