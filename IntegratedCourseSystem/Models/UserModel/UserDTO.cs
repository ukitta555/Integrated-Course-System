using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Models.UserModel
{
    /// <summary>
    /// Data Transfer Object for class User
    /// </summary>
    public class UserDTO
    {
        public string Email { get; set; }
        public int Id { get; set; }
    }
}
