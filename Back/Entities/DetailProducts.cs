using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DetailProducts
    {
        public decimal dprdID { get; set; }
        public decimal prodID { get; set; }
        public decimal bllID { get; set; }
        public decimal dprd_price { get; set; }
        public decimal dprd_quantity { get; set; }
        public string dprd_status { get; set; }
        public Nullable<System.DateTime> dprd_create_at { get; set; }
        public Nullable<System.DateTime> dprd_update_at { get; set; }
    }
}
