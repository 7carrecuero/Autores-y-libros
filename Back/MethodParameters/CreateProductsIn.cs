using Entities;
using MethodParameters.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MethodParameters
{
    public class CreateProductsIn : BaseIn
    {
        public Products product { get; set; }
    }
}
