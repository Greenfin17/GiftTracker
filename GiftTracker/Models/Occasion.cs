using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftTracker.Models
{
    public class Occasion
    {
        public Guid Id { get; set; }
        public Guid OccasionCreator { get; set; }
        public string OccasionName { get; set; }
        public DateTime OccasionDate { get; set; }
        public string OccasionLocasio { get; set; }
        public decimal Budget { get; set; }
    }
}
