
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;
#nullable disable

namespace DataBase.Models
{
    public partial class ClassSubject
    {
        public ClassSubject()
        {
            SubjectQuestionnaires = new HashSet<SubjectQuestionnaire>();
            SubjectTasks = new HashSet<SubjectTask>();
        }

        public int Id { get; set; }
        public int ClassId { get; set; }
        public int SubjectId { get; set; }

        public virtual Class Class { get; set; }
        public virtual Subject Subject { get; set; }
        public virtual ICollection<SubjectQuestionnaire> SubjectQuestionnaires { get; set; } = null;
        public virtual ICollection<SubjectTask> SubjectTasks { get; set; }
    }

}
