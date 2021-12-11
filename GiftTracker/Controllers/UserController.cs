using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftTracker.DataAccess;
using GiftTracker.Models;

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
        [HttpPost]
        public IActionResult AddUser(User userObj)
        {
            var result = _userRepository.AddUser(userObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"/api/users/${result}", result);
            }

            else return BadRequest($"User ${userObj.FirstName} ${userObj.LastName} not added.");
        }

        [HttpPut]
        public IActionResult UpdateUser(Guid userId, User userObj)
        {
            var result = _userRepository.UpdateUser(userId, userObj);
            if (result)
            {
                return Ok($"User with id ${userId} has been updated");
            }

            else return BadRequest($"User with id ${userId} not updated.");
        }
        [HttpDelete("Id")]
        public IActionResult DeleteUser(Guid userId)
        {
            var result = _userRepository.DeleteUser(userId);
            if (result)
            {
                return Ok($"User with Id ${userId} was deleted.");
            }
            else return BadRequest($"User with Id ${userId} not deleted");
        }
    }
}
