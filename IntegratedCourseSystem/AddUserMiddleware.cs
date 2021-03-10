using DataBase.Models;
using Microsoft.AspNetCore.Http;

namespace IntegratedCourseSystem
{
    public class AddUserMiddleware
    {
        private readonly RequestDelegate _next;

        public AddUserMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async System.Threading.Tasks.Task InvokeAsync(HttpContext context, IntegratedCourseSystemContext db)
        {
            db.Roles.Add(new Role { Name = "Andrew Klyachkin" });
            db.Classes.Add(new Class { Name = "A", InviteCode = "B", TeacherId = 42, MaxCapacity = 125 });
            await db.SaveChangesAsync();
            db.ClassRoles.Add(new ClassRole{ ClassId = 1, RoleId = 1});
            await db.SaveChangesAsync();
        }
    }
}
