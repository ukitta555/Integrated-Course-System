using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Questionnaire
    {
        public Questionnaire()
        {
            RolePreferences = new HashSet<RolePreference>();
            StudentRolePeriods = new HashSet<StudentRolePeriod>();
            SubjectQuestionnaires = new HashSet<SubjectQuestionnaire>();
            TeammateAntipreferences = new HashSet<TeammateAntipreference>();
            TeammatePreferences = new HashSet<TeammatePreference>();
            TechPreferences = new HashSet<TechPreference>();
        }

        public int Id { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }

        public virtual Class Class { get; set; }
        public virtual Student Student { get; set; }
        public virtual ICollection<RolePreference> RolePreferences { get; set; }
        public virtual ICollection<StudentRolePeriod> StudentRolePeriods { get; set; }
        public virtual ICollection<SubjectQuestionnaire> SubjectQuestionnaires { get; set; }
        public virtual ICollection<TeammateAntipreference> TeammateAntipreferences { get; set; }
        public virtual ICollection<TeammatePreference> TeammatePreferences { get; set; }
        public virtual ICollection<TechPreference> TechPreferences { get; set; }
    }
}
