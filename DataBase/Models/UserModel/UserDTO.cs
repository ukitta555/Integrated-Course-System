using System;
using System.Collections.Generic;
using System.Text;

namespace DataBase.Models.UserModel
{
    public class UserDTO
    {
        public int Id { get; set; }
        public UserRole Role { get; set; }
        public string Email { get; set; }
    }
}
