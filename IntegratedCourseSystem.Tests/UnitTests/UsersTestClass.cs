using System;
using Xunit;
using IntegratedCourseSystem.Controllers;
using DataBase.Models;
using System.Data.Entity;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using DataBase.Models.UserModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;
using System.Security.Principal;
using Moq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;

namespace IntegratedCourseSystem.UnitTests
{
    public class UsersTestClass
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task UsersGetAll()
        {
            //Arrange
            using (var context = CreateDatabaseContext("TestDatabaseGet1"))
            {
                var userController = new UsersController(context);
                //Act
                var users = await userController.GetUsers();
                var listResult = (List<UserDTO>)users.Value;
                //Assert
                Assert.Equal(3, listResult.Count);
                Assert.Equal(1, listResult[0].Id);
                Assert.Equal("a@knu.ua", listResult[0].Email);
                Assert.Equal(2, listResult[1].Id);
                Assert.Equal("b@knu.ua", listResult[1].Email);
                Assert.Equal(3, listResult[2].Id);
                Assert.Equal("c@knu.ua", listResult[2].Email);
                context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async System.Threading.Tasks.Task UsersGetById()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabaseGet2");
            var userController = new UsersController(context);
            //Act
            var user = await userController.GetUser(1);
            var noUser = await userController.GetUser(4);
            //Assert
            Assert.Equal(1, user.Value.Id);
            Assert.Equal("a@knu.ua", user.Value.Email);
            Assert.IsType<NotFoundResult>(noUser.Result);
            context.Database.EnsureDeleted();
        }

        #endregion

        #region PUT TESTS

        [Fact]
        public async System.Threading.Tasks.Task UsersPutSuccessful()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabasePut1");
            var userController = new UsersController(context);
            //Act
            var result = await userController.PutUser(2, new User { Id = 2, Email = "abc@knu.ua", Password = "144", Role = UserRole.Student });
            //Assert
            Assert.IsType<NoContentResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task UsersPutDoesntExist()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabasePut2");
            var userController = new UsersController(context);
            //Act
            var result = await userController.PutUser(4, new User { Id = 4, Email = "d@knu.ua", Password = "144", Role = UserRole.Student });
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task UsersPutNotMatchingIds()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabasePut3");
            var userController = new UsersController(context);
            //Act
            var result = await userController.PutUser(1, new User { Id = 2, Email = "a@knu.ua", Password = "1", Role = UserRole.Student });
            //Assert
            Assert.IsType<BadRequestResult>(result);
            context.Database.EnsureDeleted();
        }

        #endregion

        #region DELETE tests
        [Fact]
        public async System.Threading.Tasks.Task UsersDeleteSuccesfull()
        {
            // Use a clean instance of context for the test
            var context = CreateDatabaseContext("TestDatabaseDelete1");
            var userController = new UsersController(context);
            //Act
            var result = await userController.DeleteUser(1);
            //Assert
            Assert.IsType<NoContentResult>(result);
            Assert.Null(context.Users.Find(1));
            Assert.NotNull(context.Users.Find(2));
            Assert.NotNull(context.Users.Find(3));
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task UsersDeleteNotFound()
        {
            // Use a clean instance of context for the test
            var context = CreateDatabaseContext("TestDatabaseDelete2");
            var userController = new UsersController(context);
            //Act
            var result = await userController.DeleteUser(4);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }
        #endregion

        #region Login tests

        /*[Fact]
        public async System.Threading.Tasks.Task UserLoginSuccesfull()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabaseLogin1");
            var userController = new UsersController(context);
            //Act
            var result = await userController.Login(new User { Id = 1, Email = "a@knu.ua", Password = "1", Role = UserRole.Student });
            //Assert
            Assert.IsType<UserDTO>(result.Value);
            Assert.Equal("a@knu.ua", result.Value.Email);
            Assert.Equal(1, result.Value.Id);
            context.Database.EnsureDeleted();
        }*/
        [Fact]
        public async System.Threading.Tasks.Task UserLoginWrongEmail()
        {
            //Arrange
            var context = CreateDatabaseContext("TestDatabaseLogin2");
            var userController = new UsersController(context);
            //Act
            var result = await userController.Login(new User { Id = 1, Email = "wrong@knu.ua", Password = "1", Role = UserRole.Student });
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
            context.Database.EnsureDeleted();
        }

        /*[Fact]
        public async System.Threading.Tasks.Task UserLoginWrongPwd()
        {
            // Use a clean instance of context for the test
            var context = CreateContext("TestDatabaseLogin3");
            var userController = new UsersController(context);
            //Act
            var result = await userController.Login(new User { Id = 1, Email = "a@knu.ua", Password = "wrong", Role = UserRole.Student });
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }*/
        #endregion

        #region Register tests

        [Fact]
        public async System.Threading.Tasks.Task UserRegistrationSuccesfull()
        {
            var controllerContext = CreateControllerContext(isAuth: false);
            // Use a clean instance of context for the test
            var context = CreateDatabaseContext("TestDatabaseLogin1");
            var userController = new UsersController(context)
            {
                ControllerContext = controllerContext
            };
            //Act
            var result = await userController.Register(new User { Id = 5, Email = "new.email@knu.ua", Password = "1", Role = UserRole.Student });
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            context.Database.EnsureDeleted();
        }
        [Fact]
        public async System.Threading.Tasks.Task UserRegistrationAlreadyExists()
        {
            var controllerContext = CreateControllerContext(isAuth: false);
            // Use a clean instance of context for the test
            var context = CreateDatabaseContext("TestDatabaseLogin1");
            var userController = new UsersController(context)
            {
                ControllerContext = controllerContext
            };
            //Act
            var result = await userController.Register(new User { Id = 1, Email = "a@knu.ua", Password = "wrong", Role = UserRole.Student });
            //Assert
            Assert.IsType<BadRequestObjectResult>(result.Result);
            context.Database.EnsureDeleted();
        }
        #endregion

        #region PATCH tests
        // TODO
        [Fact]
        public async System.Threading.Tasks.Task TestPatchSuccefull()
        {
            // Use a clean instance of context for the test
            var context = CreateDatabaseContext("TestUserPatchSuccesfull");
            var userController = new UsersController(context);
            var patchJD = new JsonPatchDocument<User>();
            //Act
            var result = await userController.DeleteUser(1);
            //Assert
            Assert.IsType<NoContentResult>(result);
            Assert.Null(context.Users.Find(1));
            Assert.NotNull(context.Users.Find(2));
            Assert.NotNull(context.Users.Find(3));
            context.Database.EnsureDeleted();
        }
        #endregion

        //Helper functions
        private static IntegratedCourseSystemContext CreateDatabaseContext(string DbName)
        {
            //Arrange
            var options = new DbContextOptionsBuilder<IntegratedCourseSystemContext>()
            .UseInMemoryDatabase(databaseName: DbName)
            .Options;
            // Insert test users into the in-memory database
            using (var context = new IntegratedCourseSystemContext(options))
            {
                context.Users.Add(new User { Id = 1, Email = "a@knu.ua", Password = "1", Role = UserRole.Student });
                context.Users.Add(new User { Id = 2, Email = "b@knu.ua", Password = "2", Role = UserRole.Admin });
                context.Users.Add(new User { Id = 3, Email = "c@knu.ua", Password = "3", Role = UserRole.Teacher });
                context.SaveChanges();
            }
            return new IntegratedCourseSystemContext(options);
        }

        private static ControllerContext CreateControllerContext(bool isAuth)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, "John Doe"),
                new Claim(ClaimTypes.NameIdentifier, "5"),
                new Claim("name", "John Doe"),
            };
            var identity = new ClaimsIdentity(claims, "Test");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockPrincipal = new Mock<IPrincipal>();
            mockPrincipal.Setup(x => x.Identity).Returns(identity);
            mockPrincipal.Setup(x => x.Identity.IsAuthenticated).Returns(isAuth);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(m => m.User).Returns(claimsPrincipal);

            return new ControllerContext { HttpContext = mockHttpContext.Object };
        }
    }
}
