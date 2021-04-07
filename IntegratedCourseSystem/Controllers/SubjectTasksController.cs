using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;
using IntegratedCourseSystem;
using Microsoft.AspNetCore.JsonPatch;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectTasksController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public SubjectTasksController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/SubjectTasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubjectTask>>> GetSubjectTask()
        {
            return await _context.SubjectTask.ToListAsync();
        }

        // GET: api/SubjectTasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubjectTask>> GetSubjectTask(int id)
        {
            var subjectTask = await _context.SubjectTask.FindAsync(id);

            if (subjectTask == null)
            {
                return NotFound();
            }

            return subjectTask;
        }

        [HttpPatch]
        [Route("{id:int}")]
        public async Task<ActionResult<SubjectTask>> ChangeRole([FromBody] JsonPatchDocument<SubjectTask> patchDoc, int Id)
        {
            if (patchDoc != null)
            {

                var subjTask = _context
                    .SubjectTask
                    .FirstOrDefault(st => st.Id == Id);

                patchDoc.ApplyTo(subjTask, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                _context.Entry(subjTask).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return new ObjectResult(subjTask);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        // PUT: api/SubjectTasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubjectTask(int id, SubjectTask subjectTask)
        {
            if (id != subjectTask.Id)
            {
                return BadRequest();
            }

            _context.Entry(subjectTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectTaskExists(id))
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

        // POST: api/SubjectTasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<object>> PostSubjectTask(SubjectTask subjectTask)
        {
            _context.SubjectTask.Add(subjectTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubjectTask", new { id = subjectTask.Id }, subjectTask);
        }


        [HttpPost]
        [Route("getByTask")]
        public async Task<ActionResult<IEnumerable<SubjectTask>>> GetByTask(SubjectTask subjectTask)
        {
            var subjTasks = await _context
                .SubjectTask
                .Where(entry => entry.TaskId == subjectTask.TaskId)
                .ToListAsync();

            return Created("", subjTasks);
        }

        // DELETE: api/SubjectTasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubjectTask(int id)
        {
            var subjectTask = await _context.SubjectTask.FindAsync(id);
            if (subjectTask == null)
            {
                return NotFound();
            }

            _context.SubjectTask.Remove(subjectTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubjectTaskExists(int id)
        {
            return _context.SubjectTask.Any(e => e.Id == id);
        }
    }
}
