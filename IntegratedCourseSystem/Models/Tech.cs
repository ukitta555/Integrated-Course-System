using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Tech
    {
        public Tech()
        {
            Groupteches = new HashSet<GroupTech>();
            Techpreferences = new HashSet<TechPreference>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<GroupTech> Groupteches { get; set; }
        public virtual ICollection<TechPreference> Techpreferences { get; set; }
    }
}
