using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using DataBase.Models;
using DataBase.Models.UserModel;
using Microsoft.AspNetCore.JsonPatch;

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

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserDTO>> Register(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // try to find already exisiting user in DB
            var userByEmail = _context
                    .Users
                    .FirstOrDefault(entry => (entry.Email == user.Email));

            if (userByEmail != null)
            {
                ModelState.AddModelError("Email", "Duplicate email");
                return BadRequest(ModelState);
            }

            PasswordHasher<User> pwh = new PasswordHasher<User>();
            user.Password = pwh.HashPassword(user, user.Password);
            Console.WriteLine(user.Role);
            if (User.Identity.IsAuthenticated)
            {
                Console.WriteLine("Xd already in");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, ItemToDTO(user));
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserLoginDTO>> Login(User user)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            PasswordHasher<User> pwh = new PasswordHasher<User>();

            var userByEmail = _context
                    .Users
                    .FirstOrDefault(entry => (entry.Email == user.Email));
            
            if (userByEmail == null)
            {
                return NotFound();
            }
            else
            {
                
                if ((int)pwh.VerifyHashedPassword(userByEmail, userByEmail.Password, user.Password) > 0)
                {
                     await Authenticate(user.Email);
                     return Created("", ItemToDTO(userByEmail));
                
                else
                {
                    return NotFound();
                }
            }
        }


        [HttpPatch]
        [Route("{id:int}")]
        public async Task<ActionResult<User>> ChangeRole([FromBody]JsonPatchDocument<User> patchDoc, int Id)
        {
            if (patchDoc != null)
            {

                var user = _context
                    .Users
                    .FirstOrDefault(user => user.Id == Id);

                Console.WriteLine("{0} {1}", user.Email, user.Role.ToString());
                patchDoc.ApplyTo(user, ModelState);
                Console.WriteLine("{0} {1}", user.Email, user.Role.ToString());

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }


                _context.Entry(user).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return new ObjectResult(user);
            }
            else
            {
                return BadRequest(ModelState);
            }
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
              Email = user.Email,
              Id = user.Id,
              Role = user.Role
            };

        private static UserLoginDTO ItemToLoginDTO(User user) =>
            new UserLoginDTO
            {
                Email = user.Email,
                Id = user.Id,
                Role = user.Role
            };

        private async System.Threading.Tasks.Task Authenticate(string userName)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName)
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

    }
}
