using DataBase.Models;
using IntegratedCourseSystem.Controllers;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Infrastructure;
using System.Threading;

namespace IntegratedCourseSystem.Tests
{
    public class ClassesTestClass
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task GetAllClassesSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetClasses");
            var data = new List<Class>
            {
                new Class() { Id=1},
                new Class() { Id=2}
            };

            context.Classes.AddRange(data);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.GetClasses();
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data, resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetClassSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetClass");
            var data = new List<Class>
            {
                new Class() { Id=1},
                new Class() { Id=2}
            };

            context.Classes.AddRange(data);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.GetClass(id:1);
            var resValue = result.Value;
            //Assert
            Assert.Equal(data[0], resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetClassNotFound()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetClassFailed");
            var data = new List<Class>
            {
                new Class() { Id=1},
                new Class() { Id=2}
            };

            context.Classes.AddRange(data);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.GetClass(id: 3);
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetTeacherClasses()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetTeacherClasses");
            var data = new List<Class>
            {
                new Class() { Id=1, TeacherId = 1},
                new Class() { Id=2, TeacherId = 1},
                new Class() { Id=3, TeacherId = 2}
            };

            context.Classes.AddRange(data);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.TeacherClasses(Id: 1);
            var resValue = result.Value;
            //Assert
            Assert.Equal(data.Where(x=>x.TeacherId == 1), result.Value);
        }
        #endregion



        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPostClass_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostClassSuccefull");
            var testEntity = new Class() { Id = 42 };
            var controller = new ClassesController(context);
            //Act
            var result = await controller.PostClass(testEntity);
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(testEntity, context.Classes.Last());
            context.Database.EnsureDeleted();
        }

        #endregion

        #region DELETE TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteClass_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteClassSuccefull");
            var testEntity = new Class() { Id = 42 };
            context.Classes.Add(testEntity);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.DeleteClass(42);
            //Assert
            Assert.IsType<NoContentResult>(result);
            Assert.False(context.Classes.Contains(testEntity));
            Assert.Equal(0,context.Classes.Where(x=>x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteClass_NotFound_OnEmptySet()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteClassSuccefull");
            var controller = new ClassesController(context);
            //Act
            var result = await controller.DeleteClass(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteClass_NotFound_OnWrongId()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteClassSuccefull");
            var testEntity = new Class() { Id = 42 };
            context.Classes.Add(testEntity);
            context.SaveChanges();
            var controller = new ClassesController(context);
            //Act
            var result = await controller.DeleteClass(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            Assert.True(context.Classes.Contains(testEntity));
            Assert.Equal(1, context.Classes.Where(x => x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        #endregion
    }
}
