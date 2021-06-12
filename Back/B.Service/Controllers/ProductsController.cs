using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace B.Service.Controllers
{
    public class ProductsController : ApiController
    {

        [HttpPost]
        public GetProductsFiltersOut GetProductsFilters(GetProductsFiltersIn input)
        {
            Business.Products productBS = new Business.Products();
            return productBS.GetProductsFilters(input);
        }

        [HttpPost]
        public CreateProductsOut CreateProducts(CreateProductsIn input)
        {
            Business.Products productBS = new Business.Products();
            return productBS.CreateProducts(input);
        }

        [HttpPost]
        public GetProductOut GetProduct(GetProductIn input)
        {
            Business.Products productDA = new Business.Products();
            return productDA.GetProduct(input);
        }
    }
}
