#nullable disable

namespace DataBase.Models
{
    public partial class GroupTech
    {
        public int Id { get; set; }
        public int Groupid { get; set; }
        public int Techid { get; set; }

        public virtual Group Group { get; set; }
        public virtual Tech Tech { get; set; }
    }
}
