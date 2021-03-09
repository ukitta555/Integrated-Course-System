using DataBase.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    }
}
