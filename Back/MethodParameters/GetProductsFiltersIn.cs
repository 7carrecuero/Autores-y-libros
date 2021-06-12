using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class GetProductsFiltersIn: BaseIn
    {
        public string prod_name { get; set; }
        public decimal prod_code { get; set; }
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        public string orderBy { get; set; }
        public string orderDirection { get; set; }
    }
}
