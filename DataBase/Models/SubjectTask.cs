using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.Models
{
    public partial class SubjectTask
    {
        public SubjectTask()
        {
        }

        public int Id { get; set; }
        public int MaxGrade { get; set; }
        public int ActualGrade { get; set; }
        public int ClassSubjectId { get; set; }
        public int TaskId { get; set; }

        public virtual ClassSubject ClassSubject { get; set; }
        public virtual Task Task { get; set; }

    }
}
