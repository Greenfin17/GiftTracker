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
        [HttpGet("Id")]
        public IActionResult GetPartnerById(Guid partnerId)
        {
            var result = _exchangePartnerRepository.GetPartnerById(partnerId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Exchange partner with Id ${partnerId} not found.");
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
    }
}
