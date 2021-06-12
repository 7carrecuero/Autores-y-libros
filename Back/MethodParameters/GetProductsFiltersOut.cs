using Entities;
using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class GetProductsFiltersOut: BaseOut
    {
        public List<Products> products { get; set; }
        public int totalRecords { get; set; }
    }
}
