using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Required]
        public UserRole Role { get; set; }
        [Required(ErrorMessage = "Please, specify email!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please, specify password!")]
        public string Password { get; set; }

        public virtual Admin Admin { get; set; }
        public virtual Student Student { get; set; }
        public virtual Teacher Teacher { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }

    public enum UserRole
    {
        Admin,
        Teacher,
        Student
    }
}
