using System;

#nullable disable

namespace DataBase.Models
{
    public partial class StudentRolePeriod
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public int RoleId { get; set; }
        public DateTime Beginning { get; set; }
        public DateTime Ending { get; set; }

        public virtual Questionnaire Questionnaire { get; set; }
        public virtual Role Role { get; set; }
    }
}
