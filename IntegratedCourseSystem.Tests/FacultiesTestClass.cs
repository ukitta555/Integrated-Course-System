using DataBase.Models;
using IntegratedCourseSystem.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegratedCourseSystem.Tests
{
    public class FacultiesTestClass
    {
        public class TeacherTestClass
        {
            public int id;
            public string Name;
            public TeacherTestClass(int _id, string _name)
            {
                id = _id;
                Name = _name;
            }
        }
        public class FacultyTeachersTestClass
        {
            public int facultyId;
            public IEnumerable<TeacherTestClass> teachers;
            public FacultyTeachersTestClass(int f, IEnumerable<TeacherTestClass> i)
            {
                facultyId = f;
                teachers = i;
            }
        }
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task TeachersSuccefull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetTeachersFaculties");
            var faculties = new List<Faculty>
            {
                new Faculty() { Id=1},
                new Faculty() { Id=2}
            };

            var teachers = new List<Teacher>
            {
                new Teacher() {Id=1, FacultyId=1},
                new Teacher() {Id=2, FacultyId=1},
                new Teacher() {Id=3, FacultyId=2},
                new Teacher() {Id=4, FacultyId=3},
            };

            context.Faculties.AddRange(faculties);
            context.Teachers.AddRange(teachers);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.Teachers();
            var resAsOk = result as OkObjectResult;
            var expectedResult = teachers
                .GroupBy(entry => entry.FacultyId)
                .Select(g => new FacultyTeachersTestClass(g.Key, g.Select(t => new TeacherTestClass(t.Id, t.Name))))
                .OrderBy(obj => obj.facultyId);
            //Assert
            Assert.IsType<OkObjectResult>(result);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetFacultiesSuccessfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetFaculties");
            var faculties = new List<Faculty>
            {
                new Faculty() { Id=1},
                new Faculty() { Id=2}
            };

            var teachers = new List<Teacher>
            {
                new Teacher() {Id=1, FacultyId=1},
                new Teacher() {Id=2, FacultyId=1},
                new Teacher() {Id=3, FacultyId=2},
                new Teacher() {Id=4, FacultyId=3},
            };

            context.Faculties.AddRange(faculties);
            context.Teachers.AddRange(teachers);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            var groupedList = teachers
                .GroupBy(entry => entry.FacultyId)
                .Select(g => new
                {
                    FacultyId = g.Key,
                    Teachers = g.Select(t => new { Id = t.Id, Name = t.Name, Surname = t.Surname })
                })
                .OrderBy(obj => obj.FacultyId)
                .ToList();

            var expectedResult = faculties
                .ToList()
                .OrderBy(f => f.Id)
                .Select((faculty, index) => {
                    return new
                    {
                        Name = faculty.Name,
                        Id = faculty.Id,
                        facultyTeachers = groupedList[index].Teachers.ToList()
                    };
                })
                .ToList();
            //Act
            var result = await controller.GetFaculties();
            var resAsOk = result as OkObjectResult;
            //Assert
            Assert.IsType<OkObjectResult>(result);
            //Assert.Equal(expectedResult, resAsOk.Value);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetFacultySuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetFaculty");
            var data = new List<Faculty>
            {
                new Faculty() { Id=1},
                new Faculty() { Id=2}
            };

            context.Faculties.AddRange(data);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.GetFaculty(id: 1);
            var resValue = result.Value;
            //Assert
            Assert.Equal(data[0], resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task GetFaculty_NotFound()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetFacultyFailed");
            var data = new List<Faculty>
            {
                new Faculty() { Id=1},
                new Faculty() { Id=2}
            };

            context.Faculties.AddRange(data);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.GetFaculty(id: 3);
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
            Assert.Null(result.Value);
        }
        #endregion

        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestPostFaculty_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostFacultySuccefull");
            var testEntity = new Faculty() { Id = 42 };
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.PostFaculty(testEntity);
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(testEntity, context.Faculties.Last());
            context.Database.EnsureDeleted();
        }

        #endregion

        #region DELETE TESTS

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteFaculty_Succesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteFacultySuccefull");
            var testEntity = new Faculty() { Id = 42 };
            context.Faculties.Add(testEntity);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.DeleteFaculty(42);
            //Assert
            Assert.IsType<NoContentResult>(result);
            Assert.False(context.Faculties.Contains(testEntity));
            Assert.Equal(0, context.Faculties.Where(x => x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteFaculty_NotFound_OnEmptySet()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteFacultySuccefull");
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.DeleteFaculty(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async System.Threading.Tasks.Task TestDeleteFaculty_NotFound_OnWrongId()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("DeleteFacultySuccefull");
            var testEntity = new Faculty() { Id = 42 };
            context.Faculties.Add(testEntity);
            context.SaveChanges();
            var controller = new FacultiesController(context);
            //Act
            var result = await controller.DeleteFaculty(44);
            //Assert
            Assert.IsType<NotFoundResult>(result);
            Assert.True(context.Faculties.Contains(testEntity));
            Assert.Equal(1, context.Faculties.Where(x => x.Id == 42).Count());
            context.Database.EnsureDeleted();
        }

        #endregion
    }
}
