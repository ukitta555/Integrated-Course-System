using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntegratedCourseSystem.Models;
using IntegratedCourseSystem.Models.UserModel;

namespace IntegratedCourseSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IntegratedCourseSystemContext _context;

        public UsersController(IntegratedCourseSystemContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            return await _context
                .Users
                .Select(item => ItemToDTO(item))
                .ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDTO>> Register(User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }

            if (user == null)
            {
                return NotFound();
            }


            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, ItemToDTO(user));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDTO>> Login(User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context
                    .Users
                    .Where(entry => ((entry.Email == user.Email) && (entry.Password == user.Password)))
                    .ToListAsync();

            if (users.Count == 0)
            {
                return NotFound();
            }

            return Created("", ItemToDTO(users[0]));
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private static UserDTO ItemToDTO(User user) =>
            new UserDTO
            {
              Email = user.Email
            };
    }
}
