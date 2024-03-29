﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassRolesController : ControllerBase
    {
        #region Fields

        private readonly IntegratedCourseSystemContext _context;

        #endregion

        #region Constructor

        public ClassRolesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        #endregion


        #region GET Methods

        // GET: api/ClassRoles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassRole>>> GetClassRoles()
        {
            return await _context.ClassRoles.ToListAsync();
        }

        // GET: api/ClassRoles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassRole>> GetClassRole(int id)
        {
            var classRole = await _context.ClassRoles.FindAsync(id);

            if (classRole == null)
            {
                return NotFound();
            }

            return classRole;
        }

        #endregion

        #region PUT Methods

        // PUT: api/ClassRoles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassRole(int id, ClassRole classRole)
        {
            if (id != classRole.Id)
            {
                return BadRequest();
            }

            _context.Entry(classRole).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassRoleExists(id))
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

        #region POST Methods

        [HttpPost]
        [Route("getByClass")]
        public async Task<ActionResult<IEnumerable<object>>> GetByClass([FromBody] ClassTech cs)
        {
            var roles = await _context
                .ClassRoles
                .Where(role => role.ClassId == cs.ClassId)
                .Select(x => new { x.Id, x.Role.Name })
                .ToListAsync();

            return roles;
        }

        // POST: api/ClassRoles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ClassRole>> PostClassRoles(ClassRole classRole)
        {

            _context.ClassRoles.Add(classRole);
            await _context.SaveChangesAsync();

            return Created("", classRole);
        }

        #endregion

        #region DELETE Methods

        // DELETE: api/ClassRoles/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassRole(int id)
        {
            var classRole = await _context.ClassRoles.FindAsync(id);
            if (classRole == null)
            {
                return NotFound();
            }

            _context.ClassRoles.Remove(classRole);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassRoleExists(int id)
        {
            return _context.ClassRoles.Any(e => e.Id == id);
        }

        #endregion
    }
}
