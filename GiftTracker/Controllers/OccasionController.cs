using Microsoft.AspNetCore.Mvc;
using System;
using GiftTracker.DataAccess;
using GiftTracker.Models;

namespace GiftTracker.Controllers
{
    [ApiController]
    [Route("api/users/occasions")]
    public class OccasionController : ControllerBase
    {
        private OccasionRepository _occasionRepository;

        public OccasionController(OccasionRepository occasionRepo)
        {
            _occasionRepository = occasionRepo;
        }

        [HttpGet]
        public IActionResult GetAllOccasions()
        {
            var result = _occasionRepository.GetAllOccasions();
            return Ok(result);
        }

        [HttpGet("{occasionId}")]
        public IActionResult GetOccasionById(Guid occasionId)
        {
            var result = _occasionRepository.GetOccasionById(occasionId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Occasion with id ${occasionId} not found.");
        }

        [HttpGet("/api/users/{creatorId}/occasions")]
        public IActionResult GetOccasionsByCreatorId(Guid creatorId)
        {
            var result = _occasionRepository.GetOccasionsByCreatorId(creatorId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddOccasion(Occasion occasionObj)
        {
            var result = _occasionRepository.AddOccasion(occasionObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"api/users/occasions/${result}", result);
            }
            else return BadRequest($"The occasion ${occasionObj.OccasionName} was not added");
        }

        [HttpPut("{occasionId}")]
        public IActionResult UpdateOccasion(Guid occasionId, Occasion occasionObj)
        {
            var result = _occasionRepository.UpdateOccasion(occasionId, occasionObj);
            if (result)
            {
                return Ok($"Occasion with Id ${occasionId} was updated");
            }
            else return BadRequest($"Occasion with Id {occasionId} not found / not updated.");
        }

        [HttpDelete("{occasionId}")]

        public IActionResult DeleteOccasion(Guid occasionId)
        {
            var result = _occasionRepository.DeleteOccasion(occasionId);
            if (result)
            {
                return Ok($"Occasion with Id ${occasionId} was deleted");
            }
            else return BadRequest($"Occasion with Id ${occasionId} not found / not deleted.");
        }
    }
}
