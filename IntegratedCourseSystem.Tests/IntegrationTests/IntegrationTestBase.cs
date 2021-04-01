using IntegratedCourseSystem.UnitTests.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegratedCourseSystem.IntegrationTests
{
    public class IntegrationTestBase : IClassFixture<CustomWebApplicationFactory<IntegratedCourseSystem.Startup>>
    {
        protected readonly CustomWebApplicationFactory<IntegratedCourseSystem.Startup> _factory;
        protected readonly HttpClient httpClient;

        public IntegrationTestBase()
        {
            _factory = new CustomWebApplicationFactory<Startup>();
            httpClient = _factory.CreateClient();
        }
    }
}
