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
    public class SubjectsTestSubject
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task GetAllSubjectsSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetSubjects");
            var data = new List<Subject>
            {
                new Subject() { Id=1},
                new Subject() { Id=2}
            };

            context.Subjects.AddRange(data);
            context.SaveChanges();
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.GetSubjects();
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data, resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetSubjectSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetSubject");
            var data = new List<Subject>
            {
                new Subject() { Id=1},
                new Subject() { Id=2}
            };

            context.Subjects.AddRange(data);
            context.SaveChanges();
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.GetSubject(id: 1);
            var resValue = result.Value;
            //Assert
            Assert.Equal(data[0], resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetSubject_NotFound()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetSubjectFailed");
            var data = new List<Subject>
            {
                new Subject() { Id=1},
                new Subject() { Id=2}
            };

            context.Subjects.AddRange(data);
            context.SaveChanges();
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.GetSubject(id: 3);
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value);
        }
        #endregion

        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPostSubject_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostSubjectSuccefull");
            var testEntity = new Subject() { Id = 42 };
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.PostSubjects(testEntity);
            //Assert
            Assert.IsType<CreatedResult>(result.Result);
            Assert.Equal(testEntity, context.Subjects.Last());
            context.Database.EnsureDeleted();
        }

        #endregion

        #region DELETE TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteSubject_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteSubjectSuccefull");
            var testEntity = new Subject() { Id = 42 };
            context.Subjects.Add(testEntity);
            context.SaveChanges();
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.DeleteSubject(42);
            //Assert
            Assert.IsType<NoContentResult>(result);
            Assert.False(context.Subjects.Contains(testEntity));
            Assert.Equal(0, context.Subjects.Where(x => x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteSubject_NotFound_OnEmptySet()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteSubjectSuccefull");
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.DeleteSubject(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteSubject_NotFound_OnWrongId()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteSubjectSuccefull");
            var testEntity = new Subject() { Id = 42 };
            context.Subjects.Add(testEntity);
            context.SaveChanges();
            var controller = new SubjectsController(context);
            //Act
            var result = await controller.DeleteSubject(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            Assert.True(context.Subjects.Contains(testEntity));
            Assert.Equal(1, context.Subjects.Where(x => x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        #endregion
    }
}
