using DataAccess.Models;
using DataAccess.Utilities;
using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class Products
    {
        public GetProductsFiltersOut GetProductsFilters(GetProductsFiltersIn input)
        {
            GetProductsFiltersOut output = new GetProductsFiltersOut() { result = Entities.General.Result.Error };
            int? totalRecords = 0;
            using (var dataContext = DataContextHelper.GetDataContext<ProductsDataContext>())
            {
                var linqResult = dataContext.sp_getProductsFilters(input.prod_code,
                                                                input.prod_name,
                                                                input.pageSize,
                                                                input.pageNumber,
                                                                input.orderBy,
                                                                input.orderDirection,
                                                                ref totalRecords);

                output.products = new List<Entities.Products>();
                output.totalRecords = totalRecords.Value;
                foreach (var linqDContents in linqResult)
                {
                    var products = new Entities.Products()
                    {
                        prodID = linqDContents.prodID,
                        prod_name = linqDContents.prod_name,
                        prod_price = linqDContents.prod_price,
                        prod_code = linqDContents.prod_code,
                        prod_stock = linqDContents.prod_stock,
                        prod_status = linqDContents.prod_status,
                        prod_create_at = linqDContents.prod_create_at,
                        prod_update_at = linqDContents.prod_update_at
                    };
                    output.products.Add(products);
                }
                output.result = Entities.General.Result.Success;
            }
            return output;
        }

        public CreateProductsOut CreateProducts(CreateProductsIn input)
        {
            CreateProductsOut output = new CreateProductsOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<ProductsDataContext>())
            {
                var linqResult = dataContext.sp_createProducts(input.product.prod_code,
                                                               input.product.prod_name,
                                                               input.product.prod_price,
                                                               input.product.prod_stock);

                if (linqResult > 0)
                {
                    output.productID = linqResult;
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }

        public GetProductOut GetProduct(GetProductIn input)
        {
            GetProductOut output = new GetProductOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<ProductsDataContext>())
            {
                var linqResult = dataContext.sp_getProduct(input.prodID).FirstOrDefault();
                if (linqResult != null)
                {
                    output.product = new Entities.Products()
                    {
                        prodID = linqResult.prodID,
                        prod_code = linqResult.prod_code,
                        prod_name = linqResult.prod_name,
                        prod_price = linqResult.prod_price,
                        prod_stock = linqResult.prod_stock,
                        prod_status = linqResult.prod_status
                    };
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }

        public UpdateProductsOut UpdateProducts(UpdateProductsIn input)
        {
            UpdateProductsOut output = new UpdateProductsOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<ProductsDataContext>())
            {
                var linqResult = dataContext.sp_updateProducts(input.prodID,
                                                               input.stock);

                if (linqResult == 1)
                {
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;

        }

    }
}
