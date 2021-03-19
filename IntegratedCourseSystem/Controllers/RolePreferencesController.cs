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
    public class RolePreferencesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public RolePreferencesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/RolePreferences
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePreference>>> GetRolePreferences()
        {
            return await _context.RolePreferences.ToListAsync();
        }

        // GET: api/RolePreferences/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RolePreference>> GetRolePreference(int id)
        {
            var rolePreference = await _context.RolePreferences.FindAsync(id);

            if (rolePreference == null)
            {
                return NotFound();
            }

            return rolePreference;
        }

        // PUT: api/RolePreferences/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolePreference(int id, RolePreference rolePreference)
        {
            if (id != rolePreference.Id)
            {
                return BadRequest();
            }

            _context.Entry(rolePreference).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolePreferenceExists(id))
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

        // POST: api/RolePreferences
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<object>> PostRolePreference(PostArgs args)
        {
            foreach (var rolepref in args.RolePreferences)
                rolepref.QuestionnaireId = args.QuestionnaireId;

            _context.RolePreferences.AddRange(args.RolePreferences);
            await _context.SaveChangesAsync();

            return new { Id = args.QuestionnaireId };
        }

        // DELETE: api/RolePreferences/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolePreference(int id)
        {
            var rolePreference = await _context.RolePreferences.FindAsync(id);
            if (rolePreference == null)
            {
                return NotFound();
            }

            _context.RolePreferences.Remove(rolePreference);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolePreferenceExists(int id)
        {
            return _context.RolePreferences.Any(e => e.Id == id);
        }

        public struct PostArgs
        {
            public int QuestionnaireId { get; set; }
            public List<RolePreference> RolePreferences { get; set; }
        }
    }
}
