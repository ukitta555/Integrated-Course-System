using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Task
    {
        public Task()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public int ClassSubjectId { get; set; }
        public int GroupId { get; set; }
        public string Name { get; set; }
        public int MaxGrade { get; set; }
        public int ActualGrade { get; set; }
        public string TaskDescription { get; set; }
        public DateTime? Deadline { get; set; }
        public DateTime Posted { get; set; }
        public DateTime? Done { get; set; }

        public virtual ClassSubject ClassSubject { get; set; }
        public virtual Group Group { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
