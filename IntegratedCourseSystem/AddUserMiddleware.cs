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
            db.Users.Add(new User { Email = "test email", Password = "superpass" });
            await db.SaveChangesAsync();
            db.Dispose();
        }
    }
}
