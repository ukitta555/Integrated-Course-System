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

namespace IntegratedCourseSystem.Tests
{
    public class QuestionnaireTestClass
    {
        #region GET tests
        [Fact]
        public async System.Threading.Tasks.Task QuestionnaireGetSuccesfull()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetQ");
            var data = new List<Questionnaire>
            {
                new Questionnaire() { Id=0, StudentId=0, ClassId=0},
                new Questionnaire() { Id=1, StudentId=1, ClassId=0 }
            };

            context.Questionnaires.Add(data[0]);
            context.SaveChanges();
            var qController = new QuestionnaireController(context);
            //Act
            var result = await qController.GetQuestionnaire(new QuestionnaireController.QuestionnaireIdentityArgs { ClassId = 0, StudentId = 0 });
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.Equal(data.First(), resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task QuestionnairesByStudentGetSuccesfull()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetQByStudents");
            var q1 = new Questionnaire() { Id = 3, StudentId = 0, ClassId = 0 };
            var q2 = new Questionnaire() { Id = 1, StudentId = 1, ClassId = 0 };
            var q3 = new Questionnaire() { Id = 2, StudentId = 1, ClassId = 1 };
            var correctData = new List<Questionnaire>
            {
                q2,q3
            };
            context.Questionnaires.Add(q1);
            context.Questionnaires.Add(q2);
            context.Questionnaires.Add(q3);
            context.SaveChanges();
            var qController = new QuestionnaireController(context);
            //Act
            var result = await qController.GetQuestionnairesByStudent(new QuestionnaireController.QuestionnaireIdentityArgs { ClassId = 0, StudentId = 1});
            var resValue = result.Value;
            //Assert
            Assert.Equal(correctData, resValue);
        }

        [Fact]
        public async System.Threading.Tasks.Task QuestionnaireGetNotFound()
        {
            //Arrange
            var mockDbContext = new Mock<IntegratedCourseSystemContext>();
            var questionnaireList = new List<Questionnaire> {
                new Questionnaire() { Id=0, StudentId=0, ClassId=0},
                new Questionnaire() { Id=1, StudentId=1, ClassId=0 }
            };
            mockDbContext.Setup(x => x.Questionnaires).Returns(DbContextMock.GetQueryableMockDbSet(questionnaireList));
            var qController = new QuestionnaireController(mockDbContext.Object);
            //Act
            var result = await qController.GetQuestionnaire(new QuestionnaireController.QuestionnaireIdentityArgs { ClassId = 3, StudentId= 0 });
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async System.Threading.Tasks.Task QuestionnairesByStudentGetNotFound()
        {
            var context = DbContextTestHelper.CreateDatabaseContext("TestDatabaseGetNotFoundQByStudents");
            var q1 = new Questionnaire() { Id = 3, StudentId = 0, ClassId = 0 };
            var q2 = new Questionnaire() { Id = 1, StudentId = 2, ClassId = 0 };
            var q3 = new Questionnaire() { Id = 2, StudentId = 2, ClassId = 1 };
            var correctData = new List<Questionnaire>
            {
                q2,q3
            };
            context.Questionnaires.Add(q1);
            context.Questionnaires.Add(q2);
            context.Questionnaires.Add(q3);
            context.SaveChanges();
            var qController = new QuestionnaireController(context);
            //Act
            var result = await qController.GetQuestionnairesByStudent(new QuestionnaireController.QuestionnaireIdentityArgs { ClassId = 0, StudentId = 1 });
            //Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        #endregion

        #region POST TESTS

        [Fact]
        public async System.Threading.Tasks.Task QuestionnairePostSuccesfull()
        {
            //Arrange
            var mockDbContext = new Mock<IntegratedCourseSystemContext>();
            var questionnaireList = new List<Questionnaire> { };
            mockDbContext.Setup(x => x.Questionnaires).Returns(DbContextMock.GetQueryableMockDbSet(questionnaireList));
            var qController = new QuestionnaireController(mockDbContext.Object);
            var qToAdd = new Questionnaire { Id = 1, ClassId = 1, StudentId = 1 };
            //Act
            var result = await qController.PostQuestionnaire(qToAdd);
            var resValue = result.Value;
            var resResult = result.Result;
            //Assert
            Assert.IsType<CreatedAtActionResult>(result.Result);
            Assert.Equal(1, mockDbContext.Object.Questionnaires.Count());
            Assert.Equal(qToAdd, mockDbContext.Object.Questionnaires.ToList()[0]);
        }

        [Fact]
        public async System.Threading.Tasks.Task QuestionnairePostAlreadyPresent()
        {
            //Arrange
            var context = DbContextTestHelper.CreateDatabaseContext("PostContext1");
            var testEntity = new Questionnaire() { Id = 0, StudentId = 0, ClassId = 0 };
            context.Questionnaires.Add(testEntity);
            context.SaveChanges();

            //mockDbContext.Setup(x => x.Questionnaires).Returns(DbContextMock.GetQueryableMockDbSet(questionnaireList));
            var qController = new QuestionnaireController(context);
            //Act
            var result = await qController.PostQuestionnaire(testEntity);
            //Assert
            Assert.IsType<ConflictResult>(result.Result);
        }

        #endregion
    }
}
