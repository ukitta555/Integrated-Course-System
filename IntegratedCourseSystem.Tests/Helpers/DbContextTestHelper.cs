using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Tests
{
    public class DbContextTestHelper
    {
        public static IntegratedCourseSystemContext CreateDatabaseContext(string DbName)
        {
            var options = new DbContextOptionsBuilder<IntegratedCourseSystemContext>()
            .UseInMemoryDatabase(databaseName: DbName)
            .Options;
            return new IntegratedCourseSystemContext(options);
        }
    }
}
