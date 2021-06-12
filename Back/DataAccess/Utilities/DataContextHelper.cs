using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Utilities
{
    public static class DataContextHelper
    {

        public static T GetDataContext<T>() where T : DataContext
        {
            T result;
            string connectionString = ConfigurationManager.ConnectionStrings["Billing"].ToString();
           
            result = (T)Activator.CreateInstance(typeof(T), connectionString);
            return result;
        }

    }
}
