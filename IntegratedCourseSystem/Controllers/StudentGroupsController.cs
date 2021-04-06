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
    public class StudentGroupsController : ControllerBase
    {
        #region Fields

        private readonly IntegratedCourseSystemContext _context;

        #endregion

        #region Constructor
        /// <summary>
        /// Initializes new Instance of <see cref="StudentGroupsController"/>
        /// </summary>
        /// <param name="context">Database context</param>
        public StudentGroupsController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        #endregion

        #region GET Methods

        // GET: api/StudentGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StudentGroup>>> GetStudentGroups(GetArgs args)
        {
            return await _context.StudentGroups.Where(x => x.GroupId == args.GroupId).ToListAsync();
        }

        // GET: api/StudentGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentGroup>> GetStudentGroup(int id)
        {
            var studentGroup = await _context.StudentGroups.FindAsync(id);

            if (studentGroup == null)
            {
                return NotFound();
            }

            return studentGroup;
        }

        #endregion

        #region POST Methods

        [HttpPost]
        [Route("getByGroup")]
        public async Task<ActionResult<IEnumerable<GroupTech>>> GetByGroup(Group @group)
        {
            var studentGroups = await _context
                .StudentGroups
                .Where(sg => sg.GroupId == @group.Id)
                .ToListAsync();

            return Created("", studentGroups);
        }

        // POST: api/StudentGroups
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<StudentGroup>> PostStudentGroup(StudentGroup studentGroup)
        {
            _context.StudentGroups.Add(studentGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudentGroup", new { id = studentGroup.Id }, studentGroup);
        }

        [HttpPost]
        [Route("getGroupByStudent")]
        public ActionResult<int> GetGroupByStudent(PostArgs args)
        {
            var studentGroup = _context
                .StudentGroups
                .FirstOrDefault(sg => sg.StudentId == args.StudentId && sg.Group.Classid == args.ClassId);



            return Created("", studentGroup?.GroupId);
        }

        #endregion

        #region PUT Methods

        // PUT: api/StudentGroups/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentGroup(int id, StudentGroup studentGroup)
        {
            if (id != studentGroup.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentGroupExists(id))
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

        // DELETE: api/StudentGroups/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentGroup(int id)
        {
            var studentGroup = await _context.StudentGroups.FindAsync(id);
            if (studentGroup == null)
            {
                return NotFound();
            }

            _context.StudentGroups.Remove(studentGroup);
            await _context.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        [Route("remove_djinni")]
        public async Task<IActionResult> del(int id)
        {
            var toRemove = await _context
                .Groups
                .Where(gt => gt.Id >= 1)
                .ToListAsync();

            foreach (var q in toRemove)
            {
                _context.Groups.Remove(q);
                await _context.SaveChangesAsync();
            }

            var toRemove1 = await _context
                .GroupTechs
                .Where(gt => gt.Id >= 1)
                .ToListAsync();

            foreach (var q in toRemove1)
            {
                _context.GroupTechs.Remove(q);
                await _context.SaveChangesAsync();
            }

            var toRemove2 = await _context
                .StudentGroups
                .Where(gt => gt.Id >= 1)
                .ToListAsync();

            foreach (var q in toRemove2)
            {
                _context.StudentGroups.Remove(q);
                await _context.SaveChangesAsync();
            }


            return NoContent();
        }

        #endregion


        #region Helpers
        private bool StudentGroupExists(int id)
        {
            return _context.StudentGroups.Any(e => e.Id == id);
        }

        #endregion

        #region Methods args

        public class GetArgs
        {
            public int GroupId { get; set; }
        }
        public class PostArgs
        {
            public int ClassId { get; set; }
            public int StudentId { get; set; }
        }

        #endregion
    }
}
