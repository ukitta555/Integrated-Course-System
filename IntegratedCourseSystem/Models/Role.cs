using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Role
    {
        public Role()
        {
            RolePreferences = new HashSet<Rolepreference>();
            StudentRolePeriods = new HashSet<StudentRolePeriod>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Rolepreference> RolePreferences { get; set; }
        public virtual ICollection<StudentRolePeriod> StudentRolePeriods { get; set; }
    }
}
