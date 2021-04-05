using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;
using IntegratedCourseSystem;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public TasksController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DataBase.Models.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);

            var populatedTask = new
            {
                Task = task,
                Grades = _context
                        .SubjectTask
                        .Where(entry => entry.TaskId == task.Id)
                        .Select(entry => new { Grades = entry, name = entry.ClassSubject.Subject.Name })
                        .ToList(),
                AmountOfComments = _context
                        .Comments
                        .Where(comment => comment.TaskId == task.Id)
                        .Count()

            };

            if (task == null)
            {
                return NotFound();
            }

            return populatedTask;
        }

        // PUT: api/Tasks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, DataBase.Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/Tasks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<DataBase.Models.Task>> PostTask(DataBase.Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }

        [HttpPost]
        [Route("getByGroup")]
        public async Task<ActionResult<IEnumerable<object>>> GetByGroup(Group group)
        {
            var tasks = await _context
                .Tasks
                .Where(task => task.GroupId == group.Id)
                .ToListAsync();

            var result = tasks
                .Select(task => new { 
                    Task = task, 
                    Grades =  _context
                        .SubjectTask
                        .Where(entry => entry.TaskId == task.Id)
                        .Select(entry => new { Grades = entry, name = entry.ClassSubject.Subject.Name })
                        .ToList(),
                    amountOfComments = _context
                        .Comments
                        .Where(comment => comment.TaskId == task.Id)
                        .Count()
                });

            return Created("", result);
        }

        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
