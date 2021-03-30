using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace IntegratedCourseSystem.Tests
{
    public class BasicTests
    : IClassFixture<WebApplicationFactory<IntegratedCourseSystem.Startup>>
    {
        private readonly WebApplicationFactory<IntegratedCourseSystem.Startup> _factory;
        private readonly HttpClient httpClient;
        private readonly IServiceScope scope;

        public BasicTests()
        {
            _factory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder =>
                {
                    builder.ConfigureServices(services =>
                    {
                        services.Remove(services.SingleOrDefault(
                             d => d.ServiceType == typeof(IntegratedCourseSystemContext)));
                        services.AddDbContext<IntegratedCourseSystemContext>(options =>
                        {
                            options.UseInMemoryDatabase("TestDatabase14124");
                        });
                    });
                });
            httpClient = _factory.CreateClient();
            //scope = _factory.Services.CreateScope();
        }

        /*[Theory]
        //[InlineData("/api/users")]
        //[InlineData("/api/students")]
        //[InlineData("/api/teachers")]
        [InlineData("/api/questionnaires")]
        //[InlineData("/api/questionnaires")]
        public async Task Questionnaire_Get_ReturnCorrectItem(string url)
        {
            // Arrange
            using(var scope = this._factory.Services.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
                var baseAddress = _factory.Server.BaseAddress;
                dbContext.Questionnaires.Add(new DataBase.Models.Questionnaire() { StudentId = 0, ClassId = 0 });
                var request = new HttpRequestMessage()
                {
                    Method = HttpMethod.Get,
                    RequestUri = new System.Uri(baseAddress, url),
                    Content = new StringContent("{\"StudentId\":\"0\",\"ClassId\":0}", Encoding.UTF8, "application/json"),
                };
                // Act
                var response = await httpClient.SendAsync(request);

                // Assert
                response.EnsureSuccessStatusCode();
                Assert.Equal("application/json; charset=utf-8",
                    response.Content.Headers.ContentType.ToString());
            }
        }

        [Fact]
        public async Task Post_QuestionnaireReturnsSuccess()
        {
            //Arrange
            var newQuestionnaire = new DataBase.Models.Questionnaire() { Id = 0 };
            var qSerialized = new StringContent(JsonConvert.SerializeObject(newQuestionnaire), Encoding.UTF8, "application/json");
            //Act
            var response = await httpClient.PostAsync("/api/questionnaires", qSerialized);
            //Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }*/
    }
}
