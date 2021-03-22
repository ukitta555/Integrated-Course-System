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
    public class ClassTechesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public ClassTechesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/ClassTeches
        [HttpPost]
        [Route("getByClass")]
        public async Task<ActionResult<IEnumerable<object>>> GetClassTechesByClassId([FromBody] ClassTech cs)
        {
            var techs = await _context.ClassTeches
                                             .Where(x => x.ClassId == cs.ClassId)
                                             .Select(x => new { x.TechId, x.Tech.Name })
                                             .ToListAsync();

            if (techs == null)
            {
                return NotFound();
            }

            return techs;
        }

        // GET: api/ClassTeches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassTech>> GetClassTech(int id)
        {
            var classTech = await _context.ClassTeches.FindAsync(id);

            if (classTech == null)
            {
                return NotFound();
            }

            return classTech;
        }

        // PUT: api/ClassTeches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassTech(int id, ClassTech classTech)
        {
            if (id != classTech.Id)
            {
                return BadRequest();
            }

            _context.Entry(classTech).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassTechExists(id))
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

        // POST: api/ClassTeches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClassTech>> PostClassTeches(ClassTech classTech)
        {
            _context.ClassTeches.Add(classTech);
            await _context.SaveChangesAsync();

            return Created("", classTech);
        }

        // DELETE: api/ClassTeches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassTech(int id)
        {
            var classTech = await _context.ClassTeches.FindAsync(id);
            if (classTech == null)
            {
                return NotFound();
            }

            _context.ClassTeches.Remove(classTech);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassTechExists(int id)
        {
            return _context.ClassTeches.Any(e => e.Id == id);
        }
    }
}
