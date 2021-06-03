using DataBase.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeachersController : ControllerBase
    {
        private IntegratedCourseSystemContext _context;

        // GET: api/teachers
        [HttpGet]
        public async Task<ActionResult<Teacher>> Get([FromBody] int id)
        {
            var teacher = await _context
                .Teachers
                .FindAsync(id);

            if (teacher is null)
            {
                return NotFound();
            }

            return teacher;
        }

        [HttpGet("not_verified")]
        public async Task<ActionResult<IEnumerable<Teacher>>> NotVerified()
        {
            return await _context.Teachers.Where(x => !x.IsVerified.HasValue).Include(x => x.User).ToListAsync();
        }

        [HttpPatch("verify")]
        public async Task<ActionResult<Teacher>> ChangeIsVerified(VerifyArgs args)
        {
            if (args is { })
            {

                var teacher = await _context
                    .Teachers
                    .FindAsync(args.Id);

                teacher.IsVerified = args.IsVerified;

                _context.Entry(teacher).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return new ObjectResult(teacher);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpPost]
        public async Task<ActionResult<Teacher>> Post(Teacher teacher)
        {
            _context.Teachers.Add(teacher);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = teacher.Id }, teacher);
        }

        // PUT api/teachers
        [HttpPut]
        public async Task<ActionResult<Teacher>> Put([FromBody] Teacher teacher)
        {
            _context.Entry(teacher).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (await _context.Teachers.FindAsync(teacher.Id) is null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return teacher;
        }

        public TeachersController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        public class VerifyArgs
        {
            public int Id { get; set; }
            public bool IsVerified { get; set; }
        }
    }
}
