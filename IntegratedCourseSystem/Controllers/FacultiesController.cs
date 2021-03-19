using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacultiesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public FacultiesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult> Teachers()
        {
            
            var list =  (await _context.Teachers.ToListAsync());
            var groupedList = list
                .AsEnumerable()
                .GroupBy(entry => entry.FacultyId)
                .Select(g => new
                {
                    facultyId = g.Key,
                    teachers = g.Select(t => new { Id = t.Id, Name = t.Name})
                })
                .OrderBy(obj => obj.facultyId);

            return Ok(groupedList);
        }

        // GET: api/Faculties
        [HttpGet]
        public async Task<ActionResult> GetFaculties()
        {
            var list = await _context.Teachers.ToListAsync();
            var groupedList = list
                .GroupBy(entry => entry.FacultyId)
                .Select(g => new
                {
                    FacultyId = g.Key,
                    Teachers = g.Select(t => new { Id = t.Id, Name = t.Name, Surname = t.Surname })
                })
                .OrderBy(obj => obj.FacultyId)
                .ToList();

              var faculties = _context.Faculties
                  .ToList()
                  .OrderBy(f => f.Id)
                  .Select((faculty, index) => {
                      return new { 
                          Name = faculty.Name,
                          Id = faculty.Id,
                          facultyTeachers = groupedList[index].Teachers.ToList() 
                      };
                  })
                  .ToList();

            return Ok(faculties);

        }

        // GET: api/Faculties/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Faculty>> GetFaculty(int id)
        {
            var faculty = await _context.Faculties.FindAsync(id);


            if (faculty == null)
            {
                return NotFound();
            }

            return faculty;
        }

        // PUT: api/Faculties/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFaculty(int id, Faculty faculty)
        {
            if (id != faculty.Id)
            {
                return BadRequest();
            }

            _context.Entry(faculty).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FacultyExists(id))
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

        // POST: api/Faculties
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Faculty>> PostFaculty(Faculty faculty)
        {
            _context.Faculties.Add(faculty);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFaculty", new { id = faculty.Id }, faculty);
        }

        // DELETE: api/Faculties/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFaculty(int id)
        {
            var faculty = await _context.Faculties.FindAsync(id);
            if (faculty == null)
            {
                return NotFound();
            }

            _context.Faculties.Remove(faculty);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FacultyExists(int id)
        {
            return _context.Faculties.Any(e => e.Id == id);
        }
    }
}
