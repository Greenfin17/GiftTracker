using Microsoft.AspNetCore.Mvc;
using System;
using GiftTracker.DataAccess;
using GiftTracker.Models;
using Microsoft.AspNetCore.Authorization;

namespace GiftTracker.Controllers
{
    [ApiController]
    [Route("api/exchangePartners/interests")]
    [Authorize]
    public class InterestController : ControllerBase
    {
        private InterestRepository _interestRepository;
        public InterestController(InterestRepository interestRepo)
        {
            _interestRepository = interestRepo;
        }
        [HttpGet]
        public IActionResult GetAllInterests()
        {
            var result = _interestRepository.GetAllInterests();
            return Ok(result);
        }

        [HttpGet("{interestId}")]
        public IActionResult GetInterestById(Guid interestId)
        {
            var result = _interestRepository.GetInterestById(interestId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Interest with id ${interestId} not found.");
        }

        [HttpGet("/api/exchangePartners/{partnerId}/interests")]
        public IActionResult GetInterestByPartnerId(Guid partnerId)
        {
            var result = _interestRepository.GetInterestsByPartnerID(partnerId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddInterest(Interest interestObj)
        {
            var result = _interestRepository.AddInterest(interestObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"api/exchangePartners/interests/${result}", result);
            }

            else return BadRequest("Interest not added");
        }

        [HttpPut("{interestId}")]

        public IActionResult UpdateInterest(Guid interestId, Interest interestObj)
        {
            var result = _interestRepository.UpdateInterest(interestId, interestObj);
            if (result)
            {
                return Ok($"Interest with id ${interestId} has been updated.");
            }
            else return BadRequest($"Interest with id ${interestId} not updated");
        }

        [HttpDelete("{interestId}")]
        public IActionResult DeleteInterest(Guid interestId)
        {
            var result = _interestRepository.DeleteInterest(interestId);
            if (result)
            {
                return Ok($"Interest with id ${interestId} was deleted");
            }
            else return BadRequest($"Interest with id ${interestId} not found or not deleted");
        }

        [HttpDelete("/api/exchangePartners/{partnerId}/interests")]

        public IActionResult DeleteInterestsByPartnerId(Guid partnerId)
        {
            var result = _interestRepository.DeleteInterestsByPartnerId(partnerId);
            return Ok(result);
        }
    }
}
