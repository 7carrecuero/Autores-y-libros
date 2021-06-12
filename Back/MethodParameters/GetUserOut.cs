using Entities;
using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class GetUserOut: BaseOut
    {
        public Users user { get; set; }
    }
}
