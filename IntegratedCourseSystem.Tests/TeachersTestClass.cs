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

namespace IntegratedCourseSystem.Tests
{
    public class TeachersTestClass
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task GetTeacherByIdSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetTeacherById");
            var data = new List<Teacher>
            {
                new Teacher() { Id=1},
                new Teacher() { Id=2},
                new Teacher() {Id=3}
            };
            context.Teachers.AddRange(data);
            context.SaveChanges();
            var contr = new TeachersController(context);
            //Act
            var result = await contr.Get(1);
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data[0], resValue);
            Assert.Null(resResult);
            context.Database.EnsureDeleted();
        }

        #endregion

        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPostTeacher_Succesfull_ReturnsCreatedTeacher()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostTeacherSuccefull");
            var testEntity = new Teacher() { Id = 42 };
            var controller = new TeachersController(context);
            //Act
            var result = await controller.Post(testEntity);
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(testEntity, context.Teachers.Last());
            context.Database.EnsureDeleted();
        }

        #endregion

        #region PUT TESTS

        //[Fact]
        //public async System.Threading.Tasks.Task TestPutTeacher_Succesfull()
        //{
        //    //Arrange
        //    var context = DbContextTestHelper.CreateDatabaseContext("TestDatabasePutOldTeacher");
        //    var data = new List<Teacher>
        //    {
        //        new Teacher() { Id=1},
        //        new Teacher() { Id=2}
        //    };
        //    context.Teachers.AddRange(data);
        //    context.SaveChanges();
        //    var contr = new TeachersController(context);
        //    //Act
        //    var newSt = new Teacher { Id = 1, Name = "B" };
        //    var result = await contr.Put(newSt);
        //    //Assert
        //    Assert.IsType<NoContentResult>(result);
        //    Assert.Equal(newSt, context.Teachers.Find(1));
        //    context.Database.EnsureDeleted();
        //}

        //[Fact]
        //public async System.Threading.Tasks.Task TestPutTeacher_NotFound()
        //{
        //    //Arrange
        //    var context = DbContextTestHelper.CreateDatabaseContext("TestDatabasePutTeacherNotFound");
        //    var data = new List<Teacher>
        //    {
        //        new Teacher() { Id=1},
        //        new Teacher() { Id=2}
        //    };
        //    context.AddRange(data);
        //    context.SaveChanges();
        //    var contr = new TeachersController(context);
        //    //Act
        //    var result = await contr.Put(new Teacher { Id = 1 });
        //    //Assert
        //    Assert.IsType<NotFoundResult>(result);
        //    context.Database.EnsureDeleted();
        //}
        #endregion
    }
}
