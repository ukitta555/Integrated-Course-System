using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class GroupTech
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int TechId { get; set; }

        public virtual Group Group { get; set; }
        public virtual Tech Tech { get; set; }
    }
}
