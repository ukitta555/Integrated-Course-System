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
    public class GroupTechesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public GroupTechesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/GroupTeches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GroupTech>>> GetGroupTechs(GetArgs args)
        {
            return await _context.GroupTechs.Where(x => x.Groupid == args.GroupId).ToListAsync();
        }

        // GET: api/GroupTeches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GroupTech>> GetGroupTech(int id)
        {
            var groupTech = await _context.GroupTechs.FindAsync(id);

            if (groupTech == null)
            {
                return NotFound();
            }

            return groupTech;
        }

        // PUT: api/GroupTeches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGroupTech(int id, GroupTech groupTech)
        {
            if (id != groupTech.Id)
            {
                return BadRequest();
            }

            _context.Entry(groupTech).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GroupTechExists(id))
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

        // POST: api/GroupTeches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<GroupTech>> PostGroupTech(GroupTech groupTech)
        {
            _context.GroupTechs.Add(groupTech);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGroupTech", new { id = groupTech.Id }, groupTech);
        }

        [HttpPost]
        [Route("getByGroup")]
        public async Task<ActionResult<IEnumerable<GroupTech>>> GetByGroup(Group @group)
        {
            var groupTeches = await _context
                .GroupTechs
                .Where(gt => gt.Groupid == @group.Id)
                .ToListAsync();

            return Created("", groupTeches);
        }

        // DELETE: api/GroupTeches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroupTech(int id)
        {
            var groupTech = await _context.GroupTechs.FindAsync(id);
            if (groupTech == null)
            {
                return NotFound();
            }

            _context.GroupTechs.Remove(groupTech);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GroupTechExists(int id)
        {
            return _context.GroupTechs.Any(e => e.Id == id);
        }

        public class GetArgs
        {
            public int GroupId { get; set; }
        }
    }
}
