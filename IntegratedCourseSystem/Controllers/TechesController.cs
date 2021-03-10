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
    public class TechesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public TechesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/Teches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tech>>> GetTechs()
        {
            return await _context.Techs.ToListAsync();
        }

        // GET: api/Teches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tech>> GetTech(int id)
        {
            var tech = await _context.Techs.FindAsync(id);

            if (tech == null)
            {
                return NotFound();
            }

            return tech;
        }

        // PUT: api/Teches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTech(int id, Tech tech)
        {
            if (id != tech.Id)
            {
                return BadRequest();
            }

            _context.Entry(tech).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TechExists(id))
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

        // POST: api/Teches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tech>> PostTeches(Tech tech)
        {
            _context.Techs.Add(tech);
            await _context.SaveChangesAsync();
            return Created("", tech);
        }

        // DELETE: api/Teches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTech(int id)
        {
            var tech = await _context.Techs.FindAsync(id);
            if (tech == null)
            {
                return NotFound();
            }

            _context.Techs.Remove(tech);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TechExists(int id)
        {
            return _context.Techs.Any(e => e.Id == id);
        }
    }
}
