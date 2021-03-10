using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.Models
{
    public partial class ClassTech
    {

        public int Id { get; set; }
        public int ClassId { get; set; }
        public int TechId { get; set; }


        public virtual Class Class { get; set; }
        public virtual Tech Tech { get; set; }

    }
}
