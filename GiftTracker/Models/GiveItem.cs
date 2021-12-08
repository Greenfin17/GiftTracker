using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class GiveItem
    {
        public Guid Id { get; set; }
        public Guid OccasionId { get; set; }
        public Guid RecipientId { get; set; }
        public Guid WishListItemId { get; set; }
        public string Description { get; set; }
        public string MerchantURL { get; set; }
        public decimal Price { get; set; }
        public Boolean Purchased { get; set; }
        public Boolean Wrapped { get;  set; }
        public Boolean Shipped { get; set; }
        public string Reaction { get; set; }
    }
}
