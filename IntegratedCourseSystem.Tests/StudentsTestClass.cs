using DataBase.Models;
using IntegratedCourseSystem.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace IntegratedCourseSystem.Tests
{
    public class StudentsTestClass
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task StudentsGetSuccesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetStudents");
            var data = new List<Student>
            {
                new Student() { Id=1},
                new Student() { Id=2},
                new Student() {Id=3}
            };
            context.Students.AddRange(data);
            context.SaveChanges();
            var cont = new StudentsController(context);
            //Act
            var result = await cont.GetStudents();
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data, resValue);
            Assert.Null(resResult);
            context.Database.EnsureDeleted();
        }
        [Fact]
        public async System.Threading.Tasks.Task StudentsGetByClassSuccesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetStudentsByClass");
            var qs = new List<Questionnaire>
            {
                new Questionnaire() {StudentId = 1, ClassId = 1 },
                new Questionnaire() {StudentId = 2, ClassId = 1 },
                new Questionnaire() {StudentId = 3, ClassId = 0 },
            };
            var data = new List<Student>
            {
                new Student() { Id=1},
                new Student() { Id=2},
                new Student() {Id=3}
            };
            context.Questionnaires.AddRange(qs);
            context.Students.AddRange(data);
            context.SaveChanges();
            var cont = new StudentsController(context);
            //Act
            var result = await cont.GetStudentsByClass(new Questionnaire { ClassId = 1, StudentId = 1 });
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data.Where(st=>st.Id != 3), resValue);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task GetStudentByIdSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetStudentById");
            var data = new List<Student>
            {
                new Student() { Id=1},
                new Student() { Id=2},
                new Student() {Id=3}
            };
            context.Students.AddRange(data);
            context.SaveChanges();
            var contr = new StudentsController(context);
            //Act
            var result = await contr.GetStudent(1);
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data[0], resValue);
            Assert.Null(resResult);
            context.Database.EnsureDeleted();
        }

        #endregion
        #region PUT TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPutStudent_NotFound()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabasePutStudentNotFound");
            var contr = new StudentsController(context);
            //Act
            var result = await contr.PutStudent(1, new Student { Id = 1 });
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestPutStudent_BadRequest()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabasePutStudentBadRequest");
            var contr = new StudentsController(context);
            //Act
            var result = await contr.PutStudent(2, new Student { Id = 1 });
            //Assert
            Assert.IsType<BadRequestResult>(result);
            context.Database.EnsureDeleted();
        }
        #endregion

        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPostStudent_Succesfull_ReturnsCreatedStudent()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostStudentSuccefull");
            var testEntity = new Student() { Id = 42 };
            var controller = new StudentsController(context);
            //Act
            var result = await controller.PostStudent(testEntity);
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(testEntity, context.Students.Last());
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestPostStudent_AlreadyExists_ReturnsConflictResult()
        {

        }

        #endregion
    }
}
