using System;

namespace Entities
{
    public class Users
    {
        public decimal usrID { get; set; }
        public string usr_name { get; set; }
        public string usr_surname { get; set; }
        public decimal usr_document_number { get; set; }
        public string usr_email { get; set; }
        public decimal usr_age { get; set; }
        public string usr_status { get; set; }
        public Nullable<System.DateTime> usr_create_at { get; set; }
        public Nullable<System.DateTime> usr_update_at { get; set; }
    }
}
