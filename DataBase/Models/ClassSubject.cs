using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class ClassSubject
    {
        public ClassSubject()
        {
            SubjectQuestionnaires = new HashSet<SubjectQuestionnaire>();
            Tasks = new HashSet<Task>();
        }

        public int Id { get; set; }
        public int ClassId { get; set; }
        public int SubjectId { get; set; }

        public virtual Class Class { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual ICollection<SubjectQuestionnaire> SubjectQuestionnaires { get; set; }
        public virtual ICollection<Task> Tasks { get; set; }
    }
}
