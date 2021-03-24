using IntegratedCourseSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataBase.Models;

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

        #endregion

        #region HTTP POST Methods


        [HttpPost]
        [Route("getByEquality")]
        public async Task<ActionResult<Questionnaire>> GetQuestionnaire([FromBody] QuestionnaireIdentityArgs info)
        {
            //Check questionnaire for existance
            Questionnaire questionnaire = null;
            try
            {
                questionnaire = await _context
                    .Questionnaires
                    .FirstAsync(item => item.StudentId == info.StudentId && item.ClassId == info.ClassId);
            }
            catch (InvalidOperationException) { }

            if (questionnaire is null)
            {
                return NotFound();
            }

            return questionnaire;
        }


        [HttpPost]
        [Route("getByStudent")]
        public async Task<ActionResult<IEnumerable<Questionnaire>>> GetQuestionnairesByStudent([FromBody] QuestionnaireIdentityArgs info)
        {
            //Check questionnaire for existance
            List<Questionnaire> questionnaires = null;
            try
            {
                questionnaires = await _context
                    .Questionnaires
                    .Where(item => item.StudentId == info.StudentId)
                    .ToListAsync();

            }
            catch (InvalidOperationException) { }

            if (questionnaires.Count == 0)
            {
                return NotFound();
            }

            return questionnaires;
        }


        



        // POST api/Questionnaire
        [HttpPost]
        public async Task<ActionResult<Questionnaire>> PostQuestionnaire([FromBody] Questionnaire questionnaire)
        {
            //NOT TESTED METHOD!!!

            //Safety check for existing entries of questionnaire from the same student in the same class
            Questionnaire entry = null;

            try
            {
                entry = await _context
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
                                       ClassId = questionnaire.ClassId,
                                       StudentId = questionnaire.StudentId
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
            public int ClassId { get; set; }
            public int StudentId { get; set; }
        }

        #endregion
    }
}
