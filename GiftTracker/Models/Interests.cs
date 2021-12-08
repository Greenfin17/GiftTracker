using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class Interests
    {
        public Guid Id { get; set;}
        public Guid ExchangePartnerId { get; set; }
        public string InterestName { get; set; }
        public string Description { get; set; }
    }
}
