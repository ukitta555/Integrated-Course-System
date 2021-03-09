using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Tech
    {
        public Tech()
        {
            GroupTeches = new HashSet<GroupTech>();
            TechPreferences = new HashSet<TechPreference>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<GroupTech> GroupTeches { get; set; }
        public virtual ICollection<TechPreference> TechPreferences { get; set; }
    }
}
