using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Subject
    {
        public Subject()
        {
            ClassSubjects = new HashSet<ClassSubject>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ClassSubject> ClassSubjects { get; set; }
    }
}
