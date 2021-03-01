#nullable disable

namespace DataBase.Models
{
    public partial class TechPreference
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public int TechId { get; set; }
        public int PreferenceLevel { get; set; }

        public virtual Questionnaire Questionnaire { get; set; }
        public virtual Tech Tech { get; set; }
    }
}
