using Entities;
using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class GetInvoicesFiltersOut: BaseOut
    {
        public List<Invoices> invoices { get; set; }
        public int totalRecords { get; set; }
    }
}
