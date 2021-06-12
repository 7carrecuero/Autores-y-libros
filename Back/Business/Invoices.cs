using Entities.General;
using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class Invoices
    {
        public GetInvoicesFiltersOut GetInvoicesFilters(GetInvoicesFiltersIn input)
        {
            GetInvoicesFiltersOut output = new GetInvoicesFiltersOut() { result = Entities.General.Result.Error };
            DataAccess.Invoices invoiceBS = new DataAccess.Invoices();
            return invoiceBS.GetInvoicesFilters(input);
        }

        public CreateInvoicesOut CreateInvoices(CreateInvoicesIn input)
        {
            CreateInvoicesOut output = new CreateInvoicesOut() { result = Entities.General.Result.Error };
            
            Business.Products productBN = new Business.Products();
            var product = productBN.GetProduct(new GetProductIn() { 
                prodID = input.prodID
            });

            if (product.result == Result.Success)
            {
                input.price = product.product.prod_price;
                Business.Users userBN = new Business.Users();
                var user = userBN.GetUser(new GetUserIn() { usr_document_number = input.user.usr_document_number });
                if (user.result != Result.Success)
                {
                    var userCreate = userBN.CreateUser(new CreateUserIn() { 
                        user = input.user
                    });
                    if (userCreate.result == Result.Success)
                    {
                        input.user.usrID = userCreate.userID;

                    }
                }
                else
                {
                    input.user.usrID = user.user.usrID;
                }
                DataAccess.Invoices invoiceBS = new DataAccess.Invoices();
                var invoice = invoiceBS.CreateInvoices(input);
                if (invoice.result == Result.Success)
                {
                    output = invoice;

                }
            }
            else
            {
                output.result = Result.NotAvilable;
            }            
            return output;
        }

        public UpdateInvoicesOut UpdateInvoices(UpdateInvoicesIn input)
        {
            UpdateInvoicesOut output = new UpdateInvoicesOut() { result = Entities.General.Result.Error };
            DataAccess.Invoices invoiceBS = new DataAccess.Invoices();
            var invioceUpdate = invoiceBS.UpdateInvoices(input);
            if(invioceUpdate.result == Result.Success)
            {
                Business.Users userBS = new Business.Users();
                var userUpdate = userBS.UpdateUsers(new UpdateUsersIn() { 
                    user = input.user
                });

                if (userUpdate.result == Result.Success)
                {
                    output = invioceUpdate;
                }

            }
            return output;
        }

        public DeleteInvoicesOut DeleteInvoices(DeleteInvoicesIn input)
        {
            DataAccess.Invoices invoiceBS = new DataAccess.Invoices();
            return invoiceBS.DeleteInvoices(input);
        }
    }
}
