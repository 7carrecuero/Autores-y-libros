using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace B.Service.Controllers
{
    public class InvoicesController : ApiController
    {
        [HttpPost]
        public GetInvoicesFiltersOut GetInvoicesFilters(GetInvoicesFiltersIn input)
        {
            Business.Invoices invoiceBS = new Business.Invoices();
            return invoiceBS.GetInvoicesFilters(input);
        }

        [HttpPost]
        public CreateInvoicesOut CreateInvoices(CreateInvoicesIn input)
        {
            Business.Invoices invoiceBS = new Business.Invoices();
            return invoiceBS.CreateInvoices(input);
        }

        [HttpPost]
        public UpdateInvoicesOut UpdateInvoices(UpdateInvoicesIn input)
        {
            Business.Invoices invoiceBS = new Business.Invoices();
            return invoiceBS.UpdateInvoices(input);
        }

        [HttpPost]
        public DeleteInvoicesOut DeleteInvoices(DeleteInvoicesIn input)
        {
            Business.Invoices invoiceBS = new Business.Invoices();
            return invoiceBS.DeleteInvoices(input);
        }
    }
}
