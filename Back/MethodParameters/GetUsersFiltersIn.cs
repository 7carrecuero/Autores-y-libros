using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class GetUsersFiltersIn: BaseIn
    {
        public string usr_name { get; set; }
        public string usr_surname { get; set; }
        public decimal usr_document_number { get; set; }
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        public string orderBy { get; set; }
        public string orderDirection { get; set; }
    }
}
