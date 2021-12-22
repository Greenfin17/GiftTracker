using Microsoft.AspNetCore.Mvc;
using System;
using GiftTracker.DataAccess;
using GiftTracker.Models;

namespace GiftTracker.Controllers
{
    [Route("api/users/giveItems")]
    [ApiController]
    public class GiveItemController : ControllerBase
    {
        private GiveItemRepository _giveItemRepository;

        public GiveItemController(GiveItemRepository giveItemRepo)
        {
            _giveItemRepository = giveItemRepo;
        }

        [HttpGet]
        public IActionResult GetAllGiveItems()
        {
            var result = _giveItemRepository.GetAllGiveItems();
            return Ok(result);
        }

        [HttpGet("{itemId}")]
        public IActionResult GetGiveItemById(Guid itemId)
        {
            var result = _giveItemRepository.GetGiveItemById(itemId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Give item with id {itemId} not found.");
        }

       [HttpGet("occasions/{occasionId}/exchangePartners/{recipientId}")]

        public IActionResult GetGiveItemsByRecipientAndOccasion(Guid recipientId, Guid occasionId)
        {
            var result = _giveItemRepository.GetGiveItemsByRecipientAndOccasion(recipientId, occasionId);
            return Ok(result);
        }

        [HttpGet("occasions/{occasionId}")]
        public IActionResult GetGiveItemsByOccasion(Guid occasionId)
        {
            var result = _giveItemRepository.GetGiveItemsByOccasion(occasionId);
            return Ok(result);
        }
        
        [HttpGet("details/occasions/{occasionId}")]
        public IActionResult GetGiveItemsWithDetailByOccasion(Guid occasionId)
        {
            var result = _giveItemRepository.GetGiveItemsWithDetailByOccasion(occasionId);
            return Ok(result);

        }


        [HttpGet("exchangePartners/{recipientId}")]
        public IActionResult GetGiveItemsByRecipient(Guid recipientId)
        {
            var result = _giveItemRepository.GetGiveItemsByRecipient(recipientId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddGiveItem(GiveItem itemObj)
        {
            var result = _giveItemRepository.AddGiveItem(itemObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"/api/users/giveItems/{result}", result);
            }
            else return BadRequest("Give item not created");
        }

        [HttpPut("{itemId}")]
        public IActionResult UpdateGiveItem(Guid itemId, GiveItem itemObj)
        {
            var result = _giveItemRepository.UpdateGiveItem(itemId, itemObj);
            if (result)
            {
                return Ok($"Give item with id {itemId} was updated.");
            }
            else return BadRequest($"Give item with id {itemId} was not found / not updated.");
        }

        [HttpDelete("{itemId}")]
        public IActionResult DeleteGiveItem(Guid itemId)
        {

            var result = _giveItemRepository.DeleteGiveItem(itemId);
            if (result)
            {
                return Ok($"Give item with Id {itemId} was deleted");
            }
            else return BadRequest($"Give item with Id {itemId} not found / not deleted");
        }
    }
}
