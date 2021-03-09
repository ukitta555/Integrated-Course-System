using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Student
    {
        public Student()
        {
            Questionnaires = new HashSet<Questionnaire>();
            StudentGroups = new HashSet<StudentGroup>();
            WhereEnemy1 = new HashSet<TeammateAntipreference>();
            WhereEnemy2 = new HashSet<TeammateAntipreference>();
            WhereEnemy3 = new HashSet<TeammateAntipreference>();
            WhereFriend1 = new HashSet<TeammatePreference>();
            WhereFriend2 = new HashSet<TeammatePreference>();
            WhereFriend3 = new HashSet<TeammatePreference>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }

        public virtual User IdNavigation { get; set; }
        public virtual ICollection<Questionnaire> Questionnaires { get; set; }
        public virtual ICollection<StudentGroup> StudentGroups { get; set; }
        public virtual ICollection<TeammateAntipreference> WhereEnemy1 { get; set; }
        public virtual ICollection<TeammateAntipreference> WhereEnemy2 { get; set; }
        public virtual ICollection<TeammateAntipreference> WhereEnemy3 { get; set; }
        public virtual ICollection<TeammatePreference> WhereFriend1 { get; set; }
        public virtual ICollection<TeammatePreference> WhereFriend2 { get; set; }
        public virtual ICollection<TeammatePreference> WhereFriend3 { get; set; }
    }
}
