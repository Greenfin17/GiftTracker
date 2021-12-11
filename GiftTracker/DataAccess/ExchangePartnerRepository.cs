using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
// using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class ExchangePartnerRepository
    {
        readonly string _connectionString;
        public ExchangePartnerRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<ExchangePartner> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var exchangePartners = db.Query<ExchangePartner>(@"SELECT * From ExchangePartners");
            return exchangePartners;
        }

        internal ExchangePartner GetPartnerById(Guid partnerId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM ExchangePartners
                        WHERE Id = @Id";
            var partnerObj = db.QueryFirstOrDefault<ExchangePartner>(sql, new { Id = partnerId });
            return partnerObj;
        }


    }
}
