using MethodParameters.General;
using System.Collections.Generic;
using Entities;

namespace MethodParameters
{
    public class GetUsersFiltersOut: BaseOut
    {
        public List<Users> users { get; set; }
        public int totalRecords { get; set; }
    }
}
