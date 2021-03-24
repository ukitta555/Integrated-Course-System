using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;
using IntegratedCourseSystem;

namespace IntegratedCourseSystem
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectQuestionnairesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public SubjectQuestionnairesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/SubjectQuestionnaires
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectQuestionnaire>>> GetSubjectQuestionnaires()
        {
            return await _context.SubjectQuestionnaires.ToListAsync();
        }

        // GET: api/SubjectQuestionnaires/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectQuestionnaire>> GetSubjectQuestionnaire(int id)
        {
            var subjectQuestionnaire = await _context.SubjectQuestionnaires.FindAsync(id);

            if (subjectQuestionnaire == null)
            {
                return NotFound();
            }

            return subjectQuestionnaire;
        }

        // PUT: api/SubjectQuestionnaires/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubjectQuestionnaire(int id, SubjectQuestionnaire subjectQuestionnaire)
        {
            if (id != subjectQuestionnaire.Id)
            {
                return BadRequest();
            }

            _context.Entry(subjectQuestionnaire).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectQuestionnaireExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        [Route("getByQue")]
        public async Task<ActionResult<IEnumerable<SubjectQuestionnaire>>> GetByQuestionnaire([FromBody] Questionnaire que)
        {
            var subjects = await _context
                .SubjectQuestionnaires
                .Where(item => item.QuestionnaireId == que.Id)
                .ToListAsync();
            Console.WriteLine(que.Id);
            return subjects;
        }


            // POST: api/SubjectQuestionnaires
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
        public async Task<ActionResult<object>> PostSubjectsQuestionnaire([FromBody]List<SubjectQuestionnaire> subjectQuestionnaire)
        {
           /* why do we need this?
            * 
            * 
            * subjectQuestionnaire = subjectQuestionnaire.Except(await _context.SubjectQuestionnaires.ToListAsync())
                                                       .ToList();
           */
            _context.SubjectQuestionnaires.AddRange(subjectQuestionnaire);
            await _context.SaveChangesAsync();

            return new { Id = subjectQuestionnaire.FirstOrDefault()?.Id ?? 0 };
        }

        // DELETE: api/SubjectQuestionnaires/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubjectQuestionnaire(int id)
        {
            var subjectQuestionnaire = await _context.SubjectQuestionnaires.FindAsync(id);
            if (subjectQuestionnaire == null)
            {
                return NotFound();
            }

            _context.SubjectQuestionnaires.Remove(subjectQuestionnaire);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubjectQuestionnaireExists(int id)
        {
            return _context.SubjectQuestionnaires.Any(e => e.Id == id);
        }
    }
}
