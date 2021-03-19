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
    public class TeammateAntipreferencesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public TeammateAntipreferencesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/TeammateAntipreferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeammateAntipreference>>> GetTeammateAntipreferences()
        {
            return await _context.TeammateAntipreferences.ToListAsync();
        }

        // GET: api/TeammateAntipreferences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeammateAntipreference>> GetTeammateAntipreference(int id)
        {
            var teammateAntipreference = await _context.TeammateAntipreferences.FindAsync(id);

            if (teammateAntipreference == null)
            {
                return NotFound();
            }

            return teammateAntipreference;
        }

        // PUT: api/TeammateAntipreferences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeammateAntipreference(int id, TeammateAntipreference teammateAntipreference)
        {
            if (id != teammateAntipreference.Id)
            {
                return BadRequest();
            }

            _context.Entry(teammateAntipreference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeammateAntipreferenceExists(id))
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

        // POST: api/TeammateAntipreferences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeammateAntipreference>> PostTeammateAntipreference(TeammateAntipreference teammateAntipreference)
        {
            _context.TeammateAntipreferences.Add(teammateAntipreference);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeammateAntipreference", new { id = teammateAntipreference.Id }, teammateAntipreference);
        }

        // DELETE: api/TeammateAntipreferences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeammateAntipreference(int id)
        {
            var teammateAntipreference = await _context.TeammateAntipreferences.FindAsync(id);
            if (teammateAntipreference == null)
            {
                return NotFound();
            }

            _context.TeammateAntipreferences.Remove(teammateAntipreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeammateAntipreferenceExists(int id)
        {
            return _context.TeammateAntipreferences.Any(e => e.Id == id);
        }
    }
}
