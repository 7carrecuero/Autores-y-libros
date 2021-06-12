using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class Products
    {
        public GetProductsFiltersOut GetProductsFilters(GetProductsFiltersIn input)
        {
            GetProductsFiltersOut output = new GetProductsFiltersOut() { result = Entities.General.Result.Error };
            DataAccess.Products productBS = new DataAccess.Products();
            return productBS.GetProductsFilters(input);
        }

        public CreateProductsOut CreateProducts(CreateProductsIn input)
        {
            CreateProductsOut output = new CreateProductsOut() { result = Entities.General.Result.Error };
            DataAccess.Products productDA = new DataAccess.Products();
            return productDA.CreateProducts(input);
        }

        public UpdateProductsOut UpdateProducts(UpdateProductsIn input)
        {
            UpdateProductsOut output = new UpdateProductsOut() { result = Entities.General.Result.Error };
            DataAccess.Products userDA = new DataAccess.Products();
            return userDA.UpdateProducts(input);
        }

        public GetProductOut GetProduct(GetProductIn input)
        {
            GetProductOut output = new GetProductOut() { result = Entities.General.Result.Error };
            DataAccess.Products userDA = new DataAccess.Products();
            return userDA.GetProduct(input);
        }
    }
}
