using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Questionnaire
    {
        public Questionnaire()
        {
            RolePreferences = new HashSet<Rolepreference>();
            StudentRolePeriods = new HashSet<StudentRolePeriod>();
            SubjectQuestionnaires = new HashSet<SubjectQuestionnaire>();
            TeammateAntiPreferences = new HashSet<TeammateAntiPreference>();
            TeammatePreferences = new HashSet<TeammatePreference>();
            TechPreferences = new HashSet<TechPreference>();
        }

        public int Id { get; set; }
        public int StudentId { get; set; }
        public int ClassId { get; set; }

        public virtual Class Class { get; set; }
        public virtual Student Student { get; set; }
        public virtual ICollection<Rolepreference> RolePreferences { get; set; }
        public virtual ICollection<StudentRolePeriod> StudentRolePeriods { get; set; }
        public virtual ICollection<SubjectQuestionnaire> SubjectQuestionnaires { get; set; }
        public virtual ICollection<TeammateAntiPreference> TeammateAntiPreferences { get; set; }
        public virtual ICollection<TeammatePreference> TeammatePreferences { get; set; }
        public virtual ICollection<TechPreference> TechPreferences { get; set; }
    }
}
