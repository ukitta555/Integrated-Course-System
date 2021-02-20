using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class Student
    {
        public Student()
        {
            Questionnaires = new HashSet<Questionnaire>();
            StudentGroups = new HashSet<StudentGroup>();
            TeammateAntiPreferenceEnemyId1Navigations = new HashSet<TeammateAntiPreference>();
            TeammateAntiPreferenceEnemyId2Navigations = new HashSet<TeammateAntiPreference>();
            TeammateAntiPreferenceEnemyId3Navigations = new HashSet<TeammateAntiPreference>();
            TeammatePreferenceFriendId1Navigations = new HashSet<TeammatePreference>();
            TeammatePreferenceFriendId2Navigations = new HashSet<TeammatePreference>();
            TeammatePreferenceFriendId3Navigations = new HashSet<TeammatePreference>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
        public virtual ICollection<StudentGroup> StudentGroups { get; set; }
        public virtual ICollection<TeammateAntiPreference> TeammateAntiPreferenceEnemyId1Navigations { get; set; }
        public virtual ICollection<TeammateAntiPreference> TeammateAntiPreferenceEnemyId2Navigations { get; set; }
        public virtual ICollection<TeammateAntiPreference> TeammateAntiPreferenceEnemyId3Navigations { get; set; }
        public virtual ICollection<TeammatePreference> TeammatePreferenceFriendId1Navigations { get; set; }
        public virtual ICollection<TeammatePreference> TeammatePreferenceFriendId2Navigations { get; set; }
        public virtual ICollection<TeammatePreference> TeammatePreferenceFriendId3Navigations { get; set; }
    }
}
