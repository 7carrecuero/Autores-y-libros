using Entities;
using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class CreateInvoicesIn: BaseIn
    {
        public decimal quantity { get; set; }
        public decimal price { get; set; }
        public Users user { get; set; }
        public decimal prodID { get; set; }
    }
}
