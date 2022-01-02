using Microsoft.AspNetCore.Mvc;
using System;
using GiftTracker.DataAccess;
using GiftTracker.Models;

namespace GiftTracker.Controllers
{
    [Route("api/exchangePartners/wishListItems")]
    [ApiController]
    public class WishListItemController : ControllerBase
    {
        private WishListItemRepository _wishListItemRepository;

        public WishListItemController(WishListItemRepository itemRepo)
        {
            _wishListItemRepository = itemRepo;
        }

        [HttpGet]
        public IActionResult GetAllWishListItems()
        {
            var result = _wishListItemRepository.GetAllWishListItems();
            return Ok(result);
        }

        [HttpGet("{itemId}")]
        public IActionResult GetWishListItemById(Guid itemId)
        {
            var result = _wishListItemRepository.GetWishListItemById(itemId);
            if (result != null)
            {
                return Ok(result);
            }
            else return NotFound($"Wish list item with Id {itemId} not found.");
        }

        [HttpGet("/api/exchangePartners/{partnerId}/occasions/{occasionId}/wishListItems")]
        public IActionResult GetWishListItemByOwnerIdAndOccasionId(Guid partnerId, Guid occasionId)
        {
            var result = _wishListItemRepository.GetWishListItemsByOccasionAndOwner(partnerId, occasionId);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult AddWishListItem(WishListItem itemObj)
        {
            var result = _wishListItemRepository.AddWishListItem(itemObj);
            if (!result.Equals(Guid.Empty))
            {
                return Created($"/api/exchangePartners/wishListItems/${result}", result);
            }

            else return BadRequest("Wish list item not created");
        }

        [HttpPut("{itemId}")]
        public IActionResult UpdateWishListItem(Guid itemId, WishListItem itemObj)
        {
            var result = _wishListItemRepository.UpdateWishListItem(itemId, itemObj);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Wish list item with id {itemId} not found / not updated");
        }

        [HttpDelete("{itemId}")]
        public IActionResult DeleteWishListItem(Guid itemId)
        {
            var result = _wishListItemRepository.DeleteWishListItem(itemId);
            if (result)
            {
                return Ok(result);
            }
            else return BadRequest($"Wish list item with Id {itemId} not found / not deleted");
        }

    }

}
