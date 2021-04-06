using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassSubjectsController : ControllerBase
    {
        #region Fields

        private readonly IntegratedCourseSystemContext _context;

        #endregion

        #region Constructor

        public ClassSubjectsController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        #endregion


        #region GET Methods

        // GET: api/ClassSubjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassSubject>> GetClassSubject(int id)
        {
            var classSubject = await _context.ClassSubjects.FindAsync(id);

            if (classSubject == null)
            {
                return NotFound();
            }

            return classSubject;
        }

        #endregion

        #region POST Methods

        // GET: api/ClassSubjects/
        [HttpPost]
        [Route("getByClass")]
        public async Task<ActionResult<IEnumerable<object>>> GetClassSubjectNames([FromBody] ClassSubject cs)
        {
            var subjects = await _context.ClassSubjects
                                             .Where(x => x.ClassId == cs.ClassId)
                                             .Select(x => new { Id = x.Id, x.Subject.Name })
                                             .ToListAsync();

            if (subjects == null)
            {
                return NotFound();
            }

            return subjects;
        }

        [HttpPost]
        [Route("getName")]
        public async Task<ActionResult<IEnumerable<object>>> GetSubjectNameById(ClassSubject classSubject)
        {
            var q = await _context
                .ClassSubjects
                .Where(entry => entry.Id == classSubject.Id)
                .Select(entry => entry.Subject.Name)
                .ToListAsync();

            return q;
        }

        // POST: api/ClassSubjects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClassSubject>> PostClassSubject(ClassSubject classSubject)
        {
            _context.ClassSubjects.Add(classSubject);
            await _context.SaveChangesAsync();

            return Created("", classSubject);
        }

        #endregion

        #region PUT Methods

        // PUT: api/ClassSubjects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassSubject(int id, ClassSubject classSubject)
        {
            if (id != classSubject.Id)
            {
                return BadRequest();
            }

            _context.Entry(classSubject).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassSubjectExists(id))
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

        #endregion

        #region DELETE Methods

        // DELETE: api/ClassSubjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassSubject(int id)
        {
            var classSubject = await _context.ClassSubjects.FindAsync(id);
            if (classSubject == null)
            {
                return NotFound();
            }

            _context.ClassSubjects.Remove(classSubject);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion


        #region Helpers

        private bool ClassSubjectExists(int id)
        {
            return _context.ClassSubjects.Any(e => e.Id == id);
        }

        #endregion
    }
}
