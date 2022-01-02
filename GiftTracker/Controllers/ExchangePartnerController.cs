using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftTracker.DataAccess;
using GiftTracker.Models;

namespace GiftTracker.Controllers
{
    [ApiController]
    [Route("api/exchangePartners")]
    public class ExchangePartnerController : ControllerBase
    {
        private ExchangePartnerRepository _exchangePartnerRepository;
        public ExchangePartnerController(ExchangePartnerRepository exchangePartnerRepo)
        {
            _exchangePartnerRepository = exchangePartnerRepo;
        }
        [HttpGet]
        public IActionResult GetAllPartners()
        {
            var result = _exchangePartnerRepository.GetAll();

            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound("No exchange partners found.");
        }
        [HttpGet("{partnerId}")]
        public IActionResult GetPartnerById(Guid partnerId)
        {
            var result = _exchangePartnerRepository.GetPartnerById(partnerId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Exchange partner with Id ${partnerId} not found.");
        }

        [HttpGet("/api/users/{userId}/exchangePartners")]
        public IActionResult GetPartnersByCreatorId (Guid userId){
            var result = _exchangePartnerRepository.GetPartnersByCreatorId(userId);
            // OK if no results
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddPartner(ExchangePartner partnerObj)
        {
            var result = _exchangePartnerRepository.AddExchangePartner(partnerObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"/api/exchangePartners/${result}", result);
            }
            else return BadRequest($"Exchange partner ${partnerObj.FirstName} ${partnerObj.LastName} not added.");
        }

        [HttpPut("{partnerId}")]
        public IActionResult UpdatePartner(Guid partnerId, ExchangePartner partnerObj)
        {
            var result = _exchangePartnerRepository.UpdateExchangePartner(partnerId, partnerObj);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Exchange partner with id ${partnerId} not updated.");
        }

        [HttpDelete("{partnerId}")]
        public IActionResult DeletePartner(Guid partnerId)
        {
            var result = _exchangePartnerRepository.DeletePartner(partnerId);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Exchange partner with Id ${partnerId} not deleted");

        }

        [HttpGet("{partnerId}/hasData")]
        public IActionResult PartnerHasData(Guid partnerId)
        {
            var result = _exchangePartnerRepository.PartnerHasData(partnerId);
            return Ok(result);
        }
    }
}
