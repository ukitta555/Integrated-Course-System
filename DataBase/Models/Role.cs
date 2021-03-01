using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Role
    {
        public Role()
        {
            RolePreferences = new HashSet<RolePreference>();
            StudentRolePeriods = new HashSet<StudentRolePeriod>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RolePreference> RolePreferences { get; set; }
        public virtual ICollection<StudentRolePeriod> StudentRolePeriods { get; set; }
    }
}
