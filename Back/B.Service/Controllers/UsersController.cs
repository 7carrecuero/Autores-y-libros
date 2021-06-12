using MethodParameters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace B.Service.Controllers
{
    public class UsersController : ApiController
    {
        [HttpPost]
        public GetUsersFiltersOut GetUsersFilters(GetUsersFiltersIn input)
        {
            Business.Users userBS = new Business.Users();
            return userBS.GetUsersFilters(input);
        }

        [HttpPost]
        public CreateUserOut CreateUser(CreateUserIn input)
        {
            Business.Users userBS = new Business.Users();
            return userBS.CreateUser(input);
        }
    }
}
