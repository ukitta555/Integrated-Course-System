#nullable disable

namespace DataBase.Models
{
    public partial class SubjectQuestionnaire
    {
        public int Id { get; set; }
        public int ClassSubjectId { get; set; }
        public int QuestionnaireId { get; set; }

        public virtual ClassSubject ClassSubject { get; set; }
        public virtual Questionnaire Questionnaire { get; set; }
    }
}
