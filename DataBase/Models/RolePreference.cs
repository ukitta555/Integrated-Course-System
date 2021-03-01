#nullable disable

namespace DataBase.Models
{
    public partial class RolePreference
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public int RoleId { get; set; }
        public int PreferenceLevel { get; set; }

        public virtual Questionnaire Questionnaire { get; set; }
        public virtual Role Role { get; set; }
    }
}
