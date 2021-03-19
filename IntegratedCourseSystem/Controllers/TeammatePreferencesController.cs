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
    public class TeammatePreferencesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public TeammatePreferencesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/TeammatePreferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeammatePreference>>> GetTeammatePreferences()
        {
            return await _context.TeammatePreferences.ToListAsync();
        }

        // GET: api/TeammatePreferences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TeammatePreference>> GetTeammatePreference(int id)
        {
            var teammatePreference = await _context.TeammatePreferences.FindAsync(id);

            if (teammatePreference == null)
            {
                return NotFound();
            }

            return teammatePreference;
        }

        // PUT: api/TeammatePreferences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTeammatePreference(int id, TeammatePreference teammatePreference)
        {
            if (id != teammatePreference.Id)
            {
                return BadRequest();
            }

            _context.Entry(teammatePreference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeammatePreferenceExists(id))
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

        // POST: api/TeammatePreferences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TeammatePreference>> PostTeammatePreference(TeammatePreference teammatePreference)
        {
            _context.TeammatePreferences.Add(teammatePreference);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTeammatePreference", new { id = teammatePreference.Id }, teammatePreference);
        }

        // DELETE: api/TeammatePreferences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeammatePreference(int id)
        {
            var teammatePreference = await _context.TeammatePreferences.FindAsync(id);
            if (teammatePreference == null)
            {
                return NotFound();
            }

            _context.TeammatePreferences.Remove(teammatePreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TeammatePreferenceExists(int id)
        {
            return _context.TeammatePreferences.Any(e => e.Id == id);
        }
    }
}
