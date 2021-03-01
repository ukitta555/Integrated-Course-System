using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Group
    {
        public Group()
        {
            Groupteches = new HashSet<GroupTech>();
            Studentgroups = new HashSet<StudentGroup>();
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Classid { get; set; }

        public virtual Class Class { get; set; }
        public virtual ICollection<GroupTech> Groupteches { get; set; }
        public virtual ICollection<StudentGroup> Studentgroups { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
