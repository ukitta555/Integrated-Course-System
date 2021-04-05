using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataBase.Models;
using IntegratedCourseSystem;
using Newtonsoft.Json;
using Microsoft.AspNetCore.JsonPatch;
using GeneticAlgorithm;


//TODO!
namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public ClassesController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }


        [HttpPatch]
        [Route("{id:int}")]
        public async Task<ActionResult<Class>> ChangeRole([FromBody] JsonPatchDocument<Class> patchDoc, int Id)
        {
            if (patchDoc != null)
            {

                var _class = _context
                    .Classes
                    .FirstOrDefault(@class => @class.Id == Id);

                patchDoc.ApplyTo(_class, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                _context.Entry(_class).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return new ObjectResult(_class);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        // GET: api/Classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
        {
            return await _context.Classes.ToListAsync();
        }

        // GET: api/Classes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Class>> GetClass(int id)
        {
            var @class = await _context.Classes.FindAsync(id);

            if (@class == null)
            {
                return NotFound();
            }

            return @class;
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<Class>>> TeacherClasses([FromBody] int Id)
        {
            Console.WriteLine("ID {0}", Id);
            var teacherClasses = await _context
                .Classes
                .Where(_class => _class.TeacherId == Id)
                .ToListAsync();
            foreach (var @class in teacherClasses)
            {
                Console.WriteLine(@class.Id);
            }
            return teacherClasses;
        }



        [HttpPost]
        [Route("runAlgo")]
        public async Task<ActionResult<object>> RunAlgo(Class @class)
        {
            var ques = await _context
                .Questionnaires
                .Where(que => que.ClassId == @class.Id)
                .Include(que => que.TeammateAntipreferences)
                .Include(que => que.TeammatePreferences)
                .Include(que => que.Student)
                .Include(que => que.TechPreferences)
                .ThenInclude(que => que.Tech)
                .ToListAsync();


            foreach (var que in ques)
            {
                Console.WriteLine(que.Student.Name);
            }
            Algorithm algo = new Algorithm(ques, 2, 4);
            List<Group> groups = algo.Run(@class);

            int i = 1;
            foreach (var group in groups)
            {
                Console.WriteLine("___________________-");
                

                Console.WriteLine("Group name:");
                Console.WriteLine(group.Name);
                _context
                    .Groups
                    .Add(group);
                await _context.SaveChangesAsync();
                Console.WriteLine(group.Id);
            }
            
            return Created("", new { x = "d" });
        }


    // PUT: api/Classes/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
        public async Task<IActionResult> PutClass(int id, Class @class)
        {
            if (id != @class.Id)
            {
                return BadRequest();
            }

            _context.Entry(@class).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
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

        // POST: api/Classes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Class>> PostClass(Class @class)
        {
            _context.Classes.Add(@class);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClass", new { id = @class.Id }, @class);
        }

        // DELETE: api/Classes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var @class = await _context.Classes.FindAsync(id);
            if (@class == null)
            {
                return NotFound();
            }

            _context.Classes.Remove(@class);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClassExists(int id)
        {
            return _context.Classes.Any(e => e.Id == id);
        }
    }
}
