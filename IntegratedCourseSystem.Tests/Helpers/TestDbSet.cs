using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Tests.Helpers
{
    public class TestDbSet<T> : DbSet<T> where T : class {
        
    }
}
