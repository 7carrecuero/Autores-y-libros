using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class UpdateProductsIn:BaseIn
    {
        public decimal prodID { get; set; }

        public decimal stock { get; set; }
    }
}
