using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Group
    {
        public Group()
        {
            GroupTeches = new HashSet<GroupTech>();
            StudentGroups = new HashSet<StudentGroup>();
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int ClassId { get; set; }

        public virtual Class Class { get; set; }
        public virtual ICollection<GroupTech> GroupTeches { get; set; }
        public virtual ICollection<StudentGroup> StudentGroups { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
