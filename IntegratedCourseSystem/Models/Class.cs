using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Class
    {
        public Class()
        {
            ClassSubjects = new HashSet<ClassSubject>();
            Groups = new HashSet<Group>();
            Questionnaires = new HashSet<Questionnaire>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string InviteCode { get; set; }
        public int TeacherId { get; set; }
        public int MaxCapacity { get; set; }

        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<ClassSubject> ClassSubjects { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
    }
}
