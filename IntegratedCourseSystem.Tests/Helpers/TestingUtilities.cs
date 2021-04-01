using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.UnitTests
{
    public class TestingUtilities
    {
        public static IntegratedCourseSystemContext CreateInMemoryDatabaseContext(string DbName)
        {
            var options = new DbContextOptionsBuilder<IntegratedCourseSystemContext>()
            .UseInMemoryDatabase(databaseName: DbName)
            .Options;
            return new IntegratedCourseSystemContext(options);
        }

        public static void SeedDatabase(IntegratedCourseSystemContext dbContext)
        {
            // Students
            var sa = new DataBase.Models.Student { Id=1, Name = "Andrii", Surname = "Kliachkin" };
            dbContext.Students.Add(sa);
            var sb = new DataBase.Models.Student { Id=2, Name = "NotAndrii", Surname = "NotKliachkin" };
            dbContext.Students.Add(sb);
            var sc = new DataBase.Models.Student { Id=3 ,Name = "Kliandrii", Surname = "Achkin" };
            dbContext.Students.Add(sc);
            // Teachers
            var ta = new DataBase.Models.Teacher { Id=1,Name = "Alex", Surname = "Fedorus" };
            dbContext.Teachers.Add(ta);
            var tb = new DataBase.Models.Teacher { Id=2,Name = "Olena", Surname = "Shyshatska" };
            dbContext.Teachers.Add(tb);
            dbContext.SaveChanges();
            // Users
            dbContext.Users.Add(new DataBase.Models.User
            {
                Email = "a@knu.ua",
                Password = "1",
                Role = DataBase.Models.UserRole.Student,
                //Student = dbContext.Students.Single(x => x.Id == 1),
            });
            dbContext.Users.Add(new DataBase.Models.User
            {
                Email = "b@knu.ua",
                Password = "1",
                Role = DataBase.Models.UserRole.Teacher,
                //Teacher = dbContext.Teachers.Single(x=>x.Name == "Alex"),
            });
            dbContext.Users.Add(new DataBase.Models.User
            {
                Email = "c@knu.ua",
                Password = "1",
                Role = DataBase.Models.UserRole.Teacher,
                //Teacher = dbContext.Teachers.Single(x=>x.Id == 2),
            });
            // Groups
            dbContext.Groups.Add(new DataBase.Models.Group { Name = "Le Fishe au Chocolat", Classid = 0 });
            dbContext.Groups.Add(new DataBase.Models.Group { Name = "Karppi", Classid = 0 });
            dbContext.Groups.Add(new DataBase.Models.Group { Name = "Tuna", Classid = 1 });

            dbContext.SaveChanges();
        }
    }
}
