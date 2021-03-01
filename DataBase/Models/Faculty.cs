using System.Collections.Generic;

#nullable disable

namespace DataBase.Models
{
    public partial class Faculty
    {
        public Faculty()
        {
            Teachers = new HashSet<Teacher>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Teacher> Teachers { get; set; }
    }
}
