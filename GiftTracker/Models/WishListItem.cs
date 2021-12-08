using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class WishListItem
    {
        public Guid Id { get; set; }
        public Guid OccasionId { get; set; }
        public Guid OwnerId { get; set; }
        public string Description { get; set; }
        public string ItemURL { get; set; }
    }
}
