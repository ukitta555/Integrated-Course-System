using IntegratedCourseSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionnaireController : ControllerBase
    {

        #region Fields

        /// <summary>
        /// Database context.
        /// </summary>
        private readonly IntegratedCourseSystemContext _context;

        #endregion

        #region Constructor

        /// <summary>
        /// Returns new instance of <see cref="QuestionnaireController"/>.
        /// </summary>
        /// <param name="context">Database context.</param>
        public QuestionnaireController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        #endregion

        #region HTTP GET Methods

        // GET api/Questionnaire
        [HttpGet]
        public async Task<ActionResult<Questionnaire>> GetQuestionnaire([FromBody] QuestionnaireIdentityArgs info)
        {
            //Check questionnaire for existance
            Questionnaire questionnaire = null;
            try
            {
                questionnaire = await _context
                    .Questionnaires
                    .FirstAsync(item =>
                                    item.ClassId == info.class_id && item.StudentId == info.student_id
                                );
            }
            catch (InvalidOperationException){ }

            if(questionnaire is null)
            {
                return NotFound();
            }

            return questionnaire;
        }

        #endregion

        #region HTTP POST Methods

        // POST api/Questionnaire
        [HttpPost]
        public async Task<ActionResult<Questionnaire>> PostQuestionnaire([FromBody] Questionnaire questionnaire)
        {
            //NOT TESTED METHOD!!!

            //Safety check for existing entries of questionnaire from the same student in the same class
            Questionnaire entry = null;

            try
            {
                questionnaire = await _context
                    .Questionnaires
                    .FirstAsync(item =>
                                    item.ClassId == questionnaire.ClassId &&
                                    item.StudentId == questionnaire.StudentId
                               );
            }
            catch(InvalidOperationException) { }
            if (entry != null)
                return Conflict();

            //Adding new entity to db after check
            _context.Questionnaires.Add(questionnaire);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetQuestionnaire),
                                   new QuestionnaireIdentityArgs
                                   {
                                       class_id = questionnaire.ClassId,
                                       student_id = questionnaire.StudentId
                                   }, questionnaire);
        }

        #endregion

        #region HTTP PUT Methods

        // PUT api/Questionnaire/5
        [HttpPut]
        public void Put([FromBody] Questionnaire questionnaire)
        {
            //Yaroslav's TODO: implement updating questionnaire
        }

        #endregion

        #region HTTP DELETE Methods

        // DELETE api/Questionnaire
        [HttpDelete]
        public void Delete([FromBody] QuestionnaireIdentityArgs args)
        {
            // Yaroslav's TODO: implement deleting questionnaire
        }

        #endregion

        #region Argument types

        /// <summary>
        /// Type provided to get unique data that identify questionnaire from body of http request.
        /// </summary>
        public struct QuestionnaireIdentityArgs
        {
            public int class_id { get; set; }
            public int student_id { get; set; }
        }

        #endregion
    }
}
