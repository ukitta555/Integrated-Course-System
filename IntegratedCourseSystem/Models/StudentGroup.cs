using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class StudentGroup
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int StudentId { get; set; }

        public virtual Group Group { get; set; }
        public virtual Student Student { get; set; }
    }
}
