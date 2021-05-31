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
    public class CommentsController : ControllerBase
    {
        #region Fields

        private readonly IntegratedCourseSystemContext _context;

        #endregion

        #region Constructor

        public CommentsController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        #endregion

        #region GET Methods

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        #endregion

        #region PUT Methods

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
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

        #region POST Methods

        [HttpPost]
        [Route("getByTask")]
        public async Task<ActionResult<IEnumerable<object>>> GetByTask(DataBase.Models.Task task)
        {
            var comments = await _context
                .Comments
                .Where(comment => comment.TaskId == task.Id)
                .Select(comment => new { 
                    Id = comment.Id,
                    TaskId = comment.TaskId,
                    Text = comment.Text,
                    Name = comment.User.Role == UserRole.Student ? comment.User.Student.Name : comment.User.Teacher.Name,
                    Surname = comment.User.Role == UserRole.Student ? comment.User.Student.Surname : comment.User.Teacher.Surname
                })
                .OrderBy(comment => comment.Id)
                .ToListAsync();

            return Created("", comments);
        }

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        #endregion

        #region DELETE Methods

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        #endregion


        #region Helpers

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }

        #endregion
    }
}
