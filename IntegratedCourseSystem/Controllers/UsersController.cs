using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IntegratedCourseSystem.Models;
using IntegratedCourseSystem.Models.UserModel;
using Microsoft.AspNetCore.Identity;

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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            return await _context
                .Users
                .Select(item => ItemToDTO(item))
                .ToListAsync();
        }

       
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

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDTO>> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }

            PasswordHasher<User> pwh = new PasswordHasher<User>();
            user.Password = pwh.HashPassword(user, user.Password);

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

            PasswordHasher<User> pwh = new PasswordHasher<User>();

            var users = await _context
                    .Users
                    .Where(entry => (entry.Email == user.Email))
                    .ToListAsync();

            if (users.Count == 0)
            {
                return NotFound();
            }
            else
            {
                var matchedUser = users[0];
                if ((int)pwh.VerifyHashedPassword(matchedUser, matchedUser.Password, user.Password) > 0)
                {
                    return Created("", ItemToDTO(matchedUser));
                }
                else
                {
                    return NotFound();
                }
            }

        }

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

        // helper methods

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
