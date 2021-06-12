using DataAccess.Models;
using DataAccess.Utilities;
using MethodParameters;
using MethodParameters.General;
using System.Collections.Generic;
using System.Linq;

namespace DataAccess
{
    public class Users
    {
        public GetUsersFiltersOut GetUsersFilters(GetUsersFiltersIn input)
        {
            GetUsersFiltersOut output = new GetUsersFiltersOut() { result = Entities.General.Result.Error };
            int? totalRecords = 0;
            using (var dataContext = DataContextHelper.GetDataContext<UsersDataContext>())
            {
                var linqResult = dataContext.sp_getUsersFilters(input.usr_name,
                                                                input.usr_surname,
                                                                input.usr_document_number,
                                                                input.pageSize,
                                                                input.pageNumber,
                                                                input.orderBy,
                                                                input.orderDirection,
                                                                ref totalRecords);

                output.users = new List<Entities.Users>();
                output.totalRecords = totalRecords.Value;
                foreach (var linqDContents in linqResult)
                {
                    var users = new Entities.Users()
                    {
                        usrID = linqDContents.usrID,
                        usr_name = linqDContents.usr_name,
                        usr_surname = linqDContents.usr_surname,
                        usr_document_number = linqDContents.usr_document_number,
                        usr_email = linqDContents.usr_email,
                        usr_age = linqDContents.usr_age,
                        usr_status = linqDContents.usr_status,
                        usr_create_at = linqDContents.usr_create_at,
                        usr_update_at = linqDContents.usr_update_at
                    };
                    output.users.Add(users);
                }
                output.result = Entities.General.Result.Success;
            }
            return output;
        }

        public CreateUserOut CreateUser(CreateUserIn input)
        {
            CreateUserOut output = new CreateUserOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<UsersDataContext>())
            {
                var linqResult = dataContext.sp_createUser(input.user.usr_name,
                                                           input.user.usr_surname,
                                                           input.user.usr_document_number,
                                                           input.user.usr_email,
                                                           input.user.usr_age);

                if (linqResult > 0)
                {
                    output.userID = linqResult;
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }

        public GetUserOut GetUser(GetUserIn input)
        {
            GetUserOut output = new GetUserOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<UsersDataContext>())
            {
                var linqResult = dataContext.sp_getUser(input.usr_document_number).FirstOrDefault();
                if (linqResult != null)
                {
                    output.user = new Entities.Users()
                    {
                        usrID = linqResult.usrID,
                        usr_document_number = linqResult.usr_document_number,
                        usr_name = linqResult.usr_name,
                        usr_surname = linqResult.usr_surname,
                        usr_email = linqResult.usr_email,
                        usr_age = linqResult.usr_age,
                        usr_status = linqResult.usr_status,
                        usr_create_at = linqResult.usr_create_at,
                        usr_update_at = linqResult.usr_update_at
                    };
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;
        }

        public UpdateUsersOut UpdateUsers(UpdateUsersIn input)
        {
            UpdateUsersOut output = new UpdateUsersOut() { result = Entities.General.Result.Error };
            using (var dataContext = DataContextHelper.GetDataContext<UsersDataContext>())
            {
                var linqResult = dataContext.sp_updateUser(input.user.usrID,
                                                           input.user.usr_name,
                                                           input.user.usr_surname);

                if (linqResult == 1)
                {
                    output.result = Entities.General.Result.Success;
                }
            }
            return output;

        }
    }
}
