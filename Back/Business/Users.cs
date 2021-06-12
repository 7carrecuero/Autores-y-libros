using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class Users
    {
        public GetUsersFiltersOut GetUsersFilters(GetUsersFiltersIn input)
        {
            GetUsersFiltersOut output = new GetUsersFiltersOut() { result = Entities.General.Result.Error };
            DataAccess.Users userDA = new DataAccess.Users();
            output = userDA.GetUsersFilters(input);
            return output;
        }
        public CreateUserOut CreateUser(CreateUserIn input)
        {
            CreateUserOut output = new CreateUserOut() { result = Entities.General.Result.Error };
            DataAccess.Users userDA = new DataAccess.Users();
            output = userDA.CreateUser(input);
            return output;
        }

        public GetUserOut GetUser(GetUserIn input)
        {
            GetUserOut output = new GetUserOut() { result = Entities.General.Result.Error };
            DataAccess.Users userDA = new DataAccess.Users();
            output = userDA.GetUser(input);
            return output;
        }

        public UpdateUsersOut UpdateUsers(UpdateUsersIn input)
        {
            UpdateUsersOut output = new UpdateUsersOut() { result = Entities.General.Result.Error };
            DataAccess.Users userDA = new DataAccess.Users();
            return userDA.UpdateUsers(input);
        }
    }

}
