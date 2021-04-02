using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using IntegratedCourseSystem.UnitTests.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Xunit;

namespace IntegratedCourseSystem.IntegrationTests
{
    //Use custome webapplicationfactory to create inmemory database
    public class GroupIntegrationTests
    : IntegrationTestBase
    {

        [Fact]
        public async Task Get_GroupById_ReturnSuccess()
        {
            // Arrange
            var url = "/api/groups/1";
            using var scope = base._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            await dbContext.SaveChangesAsync();
            var baseAddress = _factory.Server.BaseAddress;
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                RequestUri = new System.Uri(baseAddress, url),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
            Assert.NotNull(content);
            Assert.NotEqual(0, content.Length);
        }

        [Fact]
        public async Task Get_GroupsByClassId_ReturnSuccess()
        {
            // Arrange
            var url = "/api/groups";
            using var scope = this._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            var groupGetArgs = new Controllers.GroupsController.GetArgs() { ClassId = 0 };
            var jsonArgs = JsonConvert.SerializeObject(groupGetArgs);
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Get,
                RequestUri = new System.Uri(baseAddress, url),
                Content = new StringContent(jsonArgs, Encoding.UTF8, "application/json"),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
            Assert.NotNull(content);
        }

        [Fact]
        public async Task Put_Group_Success()
        {
            // Arrange
            var url = "/api/groups/1";
            using var scope = this._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            await dbContext.SaveChangesAsync();
            var baseAddress = _factory.Server.BaseAddress;
            var jsonGroup = JsonConvert.SerializeObject(new DataBase.Models.Group() { Id = 1, Name = "Boops boops" });
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Put,
                RequestUri = new System.Uri(baseAddress, url),
                Content = new StringContent(jsonGroup, Encoding.UTF8, "application/json"),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            Assert.Equal(System.Net.HttpStatusCode.NoContent, response.StatusCode);
        }

        /*[Theory]
        [InlineData("/api/questionnaires")]
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
                var response = httpClient.GetAsync(url).Result;

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
        }
    }*/
    }
}
