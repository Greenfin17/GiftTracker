using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftTracker.DataAccess;

namespace GiftTracker.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase

    {
        private UserRepository _userRepository;
        public UserController(UserRepository userRepo)
        {
            _userRepository = userRepo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var result = _userRepository.GetAll();
            if (result.Count() >= 0)
            {
                return Ok(result);
            }
            else return NotFound("No users");
        }

        [HttpGet("Id")]
        public IActionResult GetUserById(Guid Id)
        {
            var result = _userRepository.GetUserById(Id);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"User with id ${Id} not found.");
        }
    }
}
