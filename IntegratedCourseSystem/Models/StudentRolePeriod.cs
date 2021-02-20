using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class StudentRolePeriod
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public int RoleId { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }

        public virtual Questionnaire Questionnaire { get; set; }
        public virtual Role Role { get; set; }
    }
}
