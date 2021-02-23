using IntegratedCourseSystem.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem.Extensions
{
    public static class IServiceCollectionExtensions
    {
        public static void AddIntegratedCourseSystemContext(this IServiceCollection services, IConfiguration configuration)
        {
            string connection = configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<IntegratedCourseSystemContext>(options => options.UseNpgsql(connection));

            //services.AddDbContext<IntegratedCourseSystemContext>(opt => opt.UseInMemoryDatabase("IntegratedCourseSystem"));
        }

        // put here Add.. methods for IServiceCollections for custom services
    }
}
