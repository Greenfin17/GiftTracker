using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class InterestRepository
    {
        readonly string _connectionString;
        public InterestRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GifTracker");
        }

        internal IEnumerable<Interest> GetAllInterests()
        {
            using var db = new SqlConnection(_connectionString);
            var interests = db.Query<Interest>(@"SELECT * FROM Interests");
            return interests;
        }

        internal Interest GetInterestById(Guid interestId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Interests
                        WHERE Id = @Id";
            var result = db.QueryFirstOrDefault<Interest>(sql, new { Id = interestId });
            return result;
        }

        internal IEnumerable<Interest> GetInterestsByPartnerID(Guid partnerId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Interests
                        WHERE ExchangePartnerId = @Id";
            var parameter = new
            {
                Id = partnerId
            };

            var result = db.Query<Interest>(sql, parameter);
            return result;

        }
    }
}
