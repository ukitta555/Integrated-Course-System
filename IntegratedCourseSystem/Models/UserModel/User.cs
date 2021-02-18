using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Models.UserModel
{
    public class User
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public long Id { get; set; }
        public int Role { get; set; }
    }
}
