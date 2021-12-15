using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class ExchangePartner
    {
        public Guid Id { get; set; }
        public Guid CreatedById {get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string ImageURL { get; set; }
        public DateTime Birthday { get; set; }
        public string Colors { get; set; }
        public string Sizes { get; set; }
    }
}
