using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.Models
{
    public partial class ClassRole
    {
        public int Id { get; set; }
        public int ClassId { get; set; }
        public int RoleId { get; set; }


        public virtual Class Class { get; set; }
        public virtual Role Role { get; set; }

    }
}
