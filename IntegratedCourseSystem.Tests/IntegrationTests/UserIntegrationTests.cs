using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Xunit;

namespace IntegratedCourseSystem.IntegrationTests
{
    public class UserIntegrationTests : IntegrationTestBase
    {
        [Fact]
        public async Task Get_NotLoggedInUser_ShouldReturnNull()
        {
            // Arrange
            var url = "/api/users/logged_in";
            using var scope = base._factory.Services.CreateScope();
            var client = _factory.CreateClient(
                new WebApplicationFactoryClientOptions
                {
                    AllowAutoRedirect = false
                });
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new System.Uri(baseAddress, url),
                //Content = new StringContent(JsonConvert.SerializeObject(dbContext.Users.Find(1))),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("", content);
        }
        [Fact]
        public async Task Get_LoggedInUser_ShouldReturnDTO()
        {
            // Arrange
            var url = "/api/users/logged_in";
            using var scope = base._factory.Services.CreateScope();
            // Arrange
            var client = _factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddAuthentication("Test")
                        .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                            "Test", options => { });
                });
            })
                .CreateClient(new WebApplicationFactoryClientOptions
                {
                    AllowAutoRedirect = false,
                });
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Test");
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new System.Uri(baseAddress, url),
            };
            // Act
            var response = client.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("{\"id\":1,\"role\":2,\"email\":\"a@knu.ua\",\"name\":\"Andrii\",\"surname\":\"Kliachkin\"}", content);
        }

        [Fact]
        public async Task Register_ShouldReturnCreatedAtAction()
        {
            // Arrange
            var url = "/api/users/register";
            using var scope = this._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            var newUser = new DataBase.Models.User()
            {
                Email = "asdfq@knu.ua",
                Password = "5",
                Role = DataBase.Models.UserRole.Student,
            };
            var jsonStudent = JsonConvert.SerializeObject(newUser);
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, url),
                Content = new StringContent(jsonStudent, Encoding.UTF8, "application/json"),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public async Task Login_RegisteredUser_ShouldReturnDTO()
        {
            // Arrange
            var url = "/api/users/login";
            using var scope = this._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            // Register a user
            var newUser = new DataBase.Models.User()
            {
                Email = "asdfw@knu.ua",
                Password = Convert.ToBase64String(Encoding.UTF8.GetBytes("5")),
                Role = DataBase.Models.UserRole.Student
            };
            var jsonStudent = JsonConvert.SerializeObject(newUser);
            var registerRequest = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, "/api/users/register"),
                Content = new StringContent(jsonStudent, Encoding.UTF8, "application/json"),
            };
            var registerResponse = httpClient.SendAsync(registerRequest).Result;
            registerResponse.EnsureSuccessStatusCode();
            // Try to log in
            var request = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, url),
                Content = new StringContent(jsonStudent, Encoding.UTF8, "application/json"),
            };
            // Act
            var response = httpClient.SendAsync(request).Result;
            var content = await response.Content.ReadAsStringAsync();
            // Assert
            response.EnsureSuccessStatusCode();
        }

        [Fact]
        public void Logout_LoggedInUser_ShouldReturnCreatedWithEmpty()
        {
            // Arrange: register and login
            using var scope = this._factory.Services.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
            var baseAddress = _factory.Server.BaseAddress;
            // Register a user
            var newUser = new DataBase.Models.User()
            {
                Email = "asdfe@knu.ua",
                Password = Convert.ToBase64String(Encoding.UTF8.GetBytes("5")),
                Role = DataBase.Models.UserRole.Student
            };
            var jsonStudent = JsonConvert.SerializeObject(newUser);
            var studentString = new StringContent(jsonStudent, Encoding.UTF8, "application/json");
            var registerRequest = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, "/api/users/register"),
                Content = studentString,
            };
            var registerResponse = httpClient.SendAsync(registerRequest).Result;
            registerResponse.EnsureSuccessStatusCode();
            // Log in
            var url = "/api/users/login";
            var logInRequest = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, url),
                Content = studentString,
            };
            var logInResponse = httpClient.SendAsync(logInRequest).Result;
            logInResponse.EnsureSuccessStatusCode();
            url = "/api/users/logout";
            var logOutRequest = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, url),
            };
            // Act: Log out
            var logOutResponse = httpClient.SendAsync(logOutRequest).Result;
            logOutResponse.EnsureSuccessStatusCode();
            // Try to get user info (accessible only to users that are logged in)
            var userInfoRequest = new HttpRequestMessage()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(baseAddress, "/api/users/logged_in"),
            };
            // Assert
            var userInfoResponseAfterLoggedOut = httpClient.SendAsync(userInfoRequest).Result;
            Assert.Equal("", userInfoResponseAfterLoggedOut.Content.ReadAsStringAsync().Result);
        }

        //[Fact]
        //public async Task ChangeRole_ShouldChangeRoleAndReturnObjectResult()
        //{
        //    // Arrange
        //    var url = "/api/users/1";
        //    using var scope = this._factory.Services.CreateScope();
        //    var dbContext = scope.ServiceProvider.GetRequiredService<IntegratedCourseSystemContext>();
        //    var baseAddress = _factory.Server.BaseAddress;
        //    var docString = "[{\"op\": \"add\",\"path\": \"/User/Email\",\"value\": \"cod@knu.ua\"}";
        //    var request = new HttpRequestMessage()
        //    {
        //        Method = HttpMethod.Patch,
        //        RequestUri = new System.Uri(baseAddress, url),
        //        Content = new StringContent(docString, Encoding.UTF8, "application/json"),
        //    };
        //    // Act
        //    var r = httpClient.PatchAsync(baseAddress + url, new StringContent(docString, Encoding.UTF8, "application/json")).Result;
        //    var response = httpClient.SendAsync(request).Result;
        //    var content = await response.Content.ReadAsStringAsync();
        //    // Assert
        //    response.EnsureSuccessStatusCode();
        //}

        public class TestAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
        {
            public TestAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options,
                Microsoft.Extensions.Logging.ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
                : base(options, logger, encoder, clock)
            {
            }

            protected override Task<AuthenticateResult> HandleAuthenticateAsync()
            {
                var claims = new[] { new Claim(ClaimTypes.Name, "a@knu.ua") };
                var identity = new ClaimsIdentity(claims, "Test");
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, "Test");

                var result = AuthenticateResult.Success(ticket);

                return Task.FromResult(result);
            }
        }
    }
}
