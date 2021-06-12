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
    public class Invoices
    {
        public GetInvoicesFiltersOut GetInvoicesFilters(GetInvoicesFiltersIn input)
        {
            GetInvoicesFiltersOut output = new GetInvoicesFiltersOut() { result = Entities.General.Result.Error };
            int? totalRecords = 0;
            using (var dataContext = DataContextHelper.GetDataContext<InvoicesDataContext>())
            {
                var linqResult = dataContext.sp_getInvoicesFilters(
                                                                input.pageSize,
                                                                input.pageNumber,
                                                                input.orderBy,
                                                                input.orderDirection,
                                                                ref totalRecords);

                output.invoices = new List<Entities.Invoices>();
                output.totalRecords = totalRecords.Value;
                foreach (var linqDContents in linqResult)
                {
                    var invoices = new Entities.Invoices()
                    {
                        bllID = linqDContents.bllID,
                        usrID = linqDContents.usrID,
                        bll_date = linqDContents.bll_date,
                        bll_status = linqDContents.bll_status,
                        bll_create_at = linqDContents.bll_create_at,
                        bll_update_at = linqDContents.bll_create_at,
                        usr_name = linqDContents.usr_name,
                        usr_surname = linqDContents.usr_surname,
                        usr_document_number = linqDContents.usr_document_number,
                        dprd_quantity = linqDContents.dprd_quantity,
                        dprd_price = linqDContents.dprd_price,
                    };
                    output.invoices.Add(invoices);
                }
                output.result = Entities.General.Result.Success;
            }
            return output;
        }

        public CreateInvoicesOut CreateInvoices(CreateInvoicesIn input)
        {
            CreateInvoicesOut output = new CreateInvoicesOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<InvoicesDataContext>())
            {
                var linqResult = dataContext.sp_createInvoice(input.user.usrID,
                                                              input.price,
                                                              input.quantity,
                                                              input.prodID);

                if (linqResult > 0)
                {
                    output.invoiceID = linqResult;
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }

        public UpdateInvoicesOut UpdateInvoices(UpdateInvoicesIn input)
        {
            UpdateInvoicesOut output = new UpdateInvoicesOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<InvoicesDataContext>())
            {
                var linqResult = dataContext.sp_updateInvoices(input.bllID);

                if (linqResult == 1)
                {
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;

        }

        public DeleteInvoicesOut DeleteInvoices(DeleteInvoicesIn input)
        {
            DeleteInvoicesOut output = new DeleteInvoicesOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<InvoicesDataContext>())
            {
                var linqResult = dataContext.sp_deleteInvoice(input.bllID);

                if (linqResult == 1)
                {
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }
    }
}
