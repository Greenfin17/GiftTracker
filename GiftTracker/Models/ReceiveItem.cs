using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class ReceiveItem
    {
        public Guid Id { get; set; }
        public Guid OccasionId { get; set; }
        public Guid GiverId { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string ItemURL { get; set; }
        public string Remarks { get; set; }
        public Boolean Thanked { get; set; }
    }

    public class ReceiveItemWithDetail
    {
        public Guid Id { get; set; }
        public Guid OccasionId { get; set; }
        public Guid GiverId { get; set; }
        public string GiverFirstName { get; set; }
        public string GiverLastName { get; set; }
        public string itemName { get; set; }
        public string itemDescription { get; set; }
        public string ItemURL { get; set; }
        public string Remarks { get; set; }
        public Boolean Thanked { get; set; }

    }
}
