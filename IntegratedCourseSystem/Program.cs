using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace IntegratedCourseSystem
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //тут и напишем скрипт
            //норм?))
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        public static void CreateDB()
        {
            // Пока лучше не трогать, потом отдебажим
            var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

            string dbcreate = File.ReadAllText(@"DBManipulators/createDB.sql");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlDataAdapter myDataAdapter = new SqlDataAdapter(dbcreate, connection))
                {
                    DataTable dtResult = new DataTable();
                    myDataAdapter.Fill(dtResult);
                }
            }
        }
    }
}