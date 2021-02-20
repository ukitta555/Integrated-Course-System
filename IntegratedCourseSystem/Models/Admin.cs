using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Admin
    {
        public int Id { get; set; }

        public virtual User User { get; set; }
    }
}
