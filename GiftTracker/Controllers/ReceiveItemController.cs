using Microsoft.AspNetCore.Mvc;
using System;
using GiftTracker.DataAccess;
using GiftTracker.Models;
using Microsoft.AspNetCore.Authorization;

namespace GiftTracker.Controllers
{
    [Route("api/users/receiveItems")]
    [ApiController]
    [Authorize]
    public class ReceiveItemController : ControllerBase
    {
        private ReceiveItemRepository _receiveItemRepository;
        private ExchangePartnerRepository _exchangePartnerRepository;
        private UserRepository _userRepository;
        private OccasionRepository _occasionRepository;

        public ReceiveItemController(ReceiveItemRepository receiveRepo,
                              ExchangePartnerRepository partnerRepo,
                              UserRepository userRepo,
                              OccasionRepository occasionRepo
                              )
        {
            _receiveItemRepository = receiveRepo;
            _exchangePartnerRepository = partnerRepo;
            _userRepository = userRepo;
            _occasionRepository = occasionRepo;
        }

        [HttpGet]
        public IActionResult GetAllReceiveItems()
        {
            var result = _receiveItemRepository.GetAllReceiveItems();
            return Ok(result);
        }

        [HttpGet("{itemId}")]
         public IActionResult GetReceiveItemById(Guid itemId)
        {
            var result = _receiveItemRepository.GetReceiveItemsById(itemId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Receive item with id {itemId} not found.");
        }
        
        [HttpGet("receiveItemWithDetail/{itemId}")]
         public IActionResult GetReceiveItemWithiDetailById(Guid itemId)
        {
            var result = _receiveItemRepository.GetReceiveItemWithDetailById(itemId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Receive item with id {itemId} not found.");
        }

        [HttpGet("/api/users/{recipientId}/receiveItems")]
        public IActionResult GetReceiveItemsByRecipientId(Guid recipientId)
        {
            if (_userRepository.UserExists(recipientId))
            {
                var result = _receiveItemRepository.GetReceiveItemsByRecipientId(recipientId);
                return Ok(result);
            }
            else return NotFound($"Recipient with id {recipientId} not found.");
        }

        [HttpGet("/api/users/receiveItemsWithDetail/occasions/{occasionId}")]
        public IActionResult GetReceiveItemsWithDetailByOccasionId(Guid occasionId)
        {
            var result = _receiveItemRepository.GetReceiveItemsWithDetailByOccasionId(occasionId);
            return Ok(result);
        }

        [HttpGet("/api/users/receiveItemsWithDetail/occasions/{occasionId}/giver/{giverId}")]

        public IActionResult GetReceiveItemsWithDetailByOccasionIdAndGiverId(Guid occasionId, Guid giverId)
        {
            var result = _receiveItemRepository.GetReceiveItemsWithDetailByOccasionIdAndGiverId(occasionId, giverId);
            return Ok(result);
        }


        [HttpGet("/api/users/{recipientId}/receiveItems/occasion/{occasionId}")]
        public IActionResult GetReceiveItemsByOccasionAndRecipientId(Guid recipientId, Guid occasionId)
        {
            bool recipientExists = _userRepository.UserExists(recipientId);
            bool occasionExists = _occasionRepository.OccasionExists(occasionId);
            if (recipientExists && occasionExists)
            {
                var result = _receiveItemRepository.GetReceiveItemsByOccasionAndReceipientId(recipientId, occasionId);
                return Ok(result);
            }
            if (!recipientExists && occasionExists)
            {
                return NotFound($"Recipient with id {recipientId} not found.");
            }
            else if (recipientExists && !occasionExists)
            {
                return NotFound($"Occasion with id {occasionId} not found.");
            }
            else return NotFound($"Recipient with id {recipientId} and Occasion with id {occasionId} not found.");
        }

        [HttpGet("/api/users/{recipientId}/receiveItems/giver/{giverId}")]
        public IActionResult GetReceiveItemBySenderAndRecipientId(Guid recipientId, Guid giverId)
        {
            bool recipientExists = _userRepository.UserExists(recipientId);
            bool giverExists = _exchangePartnerRepository.ExchangePartnerExists(giverId);
            if (recipientExists && giverExists)
            {
                var result = _receiveItemRepository.GetReceiveItemsBySenderAndReceipientId(recipientId, giverId);
                return Ok(result);
            }
            if (!recipientExists && giverExists)
            {
                return NotFound($"Recipient with id {recipientId} not found.");
            }
            else if (recipientExists && !giverExists)
            {
                return NotFound($"Giver with id {giverId} not found.");
            }
            else return NotFound($"Recipient with id {recipientId} and Giver with id {giverId} not found.");
        }

        [HttpPost]
        public IActionResult AddReceiveItem(ReceiveItem itemObj)
        {
            var result = _receiveItemRepository.AddReceiveItem(itemObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"/api/users/receiveItems/{result}", result);
            }
            else return BadRequest("Receive item not added");
        }

        [HttpPut("{itemId}")]
        public IActionResult UpdatedReceiveItem(Guid itemId, ReceiveItem itemObj)
        {
            var result = _receiveItemRepository.UpdatedReceiveItem(itemId, itemObj);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Receive item with id {itemId} was not found / not updated.");
        }

        [HttpDelete("{itemId}")]
        public IActionResult DeleteReceiveItem(Guid itemId)
        {
            var result = _receiveItemRepository.DeleteReceiveItem(itemId);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Receive item with Id {itemId} not found / not deleted");

        }
    }
}
