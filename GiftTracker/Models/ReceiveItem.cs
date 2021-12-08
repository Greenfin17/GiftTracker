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
        public string Description { get; set; }
        public string ItemURL { get; set; }
        public string Remarks { get; set; }
        public Boolean Thanked { get; set; }
    }
}
