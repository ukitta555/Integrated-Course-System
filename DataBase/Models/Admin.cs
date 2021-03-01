#nullable disable

namespace DataBase.Models
{
    public partial class Admin
    {
        public int Id { get; set; }

        public virtual User User { get; set; }
    }
}
