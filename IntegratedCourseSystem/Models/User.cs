using System;
using System.Collections.Generic;

#nullable disable

namespace IntegratedCourseSystem.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public int Role { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Student Student { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
