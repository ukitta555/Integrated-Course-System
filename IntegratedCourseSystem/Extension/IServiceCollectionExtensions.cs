using IntegratedCourseSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddIntegratedCourseSystemContext(this IServiceCollection services)
        {
            services.AddDbContext<IntegratedCourseSystemContext>(opt => opt.UseInMemoryDatabase("IntegratedCourseSystem"));
        }

        // put here Add.. methods for IServiceCollections for custom services
    }
}
