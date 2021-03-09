using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Teacher
    {
        public Teacher()
        {
            Classes = new HashSet<Class>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int FacultyId { get; set; }
        public bool? IsVerified { get; set; }

        public virtual Faculty Faculty { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Class> Classes { get; set; }
    }
}
