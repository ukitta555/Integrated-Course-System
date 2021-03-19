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
    public class TechPreferencesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public TechPreferencesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/TechPreferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TechPreference>>> GetTechPreferences()
        {
            return await _context.TechPreferences.ToListAsync();
        }

        // GET: api/TechPreferences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TechPreference>> GetTechPreference(int id)
        {
            var techPreference = await _context.TechPreferences.FindAsync(id);

            if (techPreference == null)
            {
                return NotFound();
            }

            return techPreference;
        }

        // PUT: api/TechPreferences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTechPreference(int id, TechPreference techPreference)
        {
            if (id != techPreference.Id)
            {
                return BadRequest();
            }

            _context.Entry(techPreference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TechPreferenceExists(id))
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

        // POST: api/TechPreferences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<object>> PostTechPreference(PostArgs args)
        {
            foreach (var techpref in args.techPreferences)
                techpref.QuestionnaireId = args.QuestionnaireId;

            _context.TechPreferences.AddRange(args.techPreferences);
            await _context.SaveChangesAsync();

            return new { Id = args.QuestionnaireId };
        }

        // DELETE: api/TechPreferences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTechPreference(int id)
        {
            var techPreference = await _context.TechPreferences.FindAsync(id);
            if (techPreference == null)
            {
                return NotFound();
            }

            _context.TechPreferences.Remove(techPreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TechPreferenceExists(int id)
        {
            return _context.TechPreferences.Any(e => e.Id == id);
        }

        public struct PostArgs
        {
            public int QuestionnaireId { get; set; }
            public List<TechPreference> techPreferences { get; set; }
        }
    }
}
