using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;

#nullable disable

namespace DataBase.Models
{
    public partial class User
    {
        public User()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; } = UserRole.NoRole;

        public virtual Admin Admin { get; set; }
        public virtual Student Student { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
