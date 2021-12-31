using System;
using System.Collections.Generic;
using System.Linq;
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
            _connectionString = config.GetConnectionString("GiftTracker");
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
        internal Guid AddInterest(Interest interestObj)
        {
            using var db = new SqlConnection(_connectionString);
            Guid id = new Guid();
            var sql = @"INSERT INTO Interests (ExchangePartnerId, InterestName, Description)
                        OUTPUT Inserted.Id
                        VALUES (@ExchangePartnerId, @InterestName, @Description)";

            id = db.ExecuteScalar<Guid>(sql, interestObj);
            if (!id.Equals(Guid.Empty))
            {
                interestObj.Id = id;
            }
            return id;
        }


        internal bool UpdateInterest(Guid interestId, Interest interestObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Interests
                        SET Id = @Id,
                            ExchangePartnerId = @ExchangePartnerId,
                            InterestName = @InterestName,
                            Description = @Description
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = interestId,
                ExchangePartnerId = interestObj.ExchangePartnerId,
                InterestName = interestObj.InterestName,
                Description = interestObj.Description
            };

            var result = db.Query<Interest>(sql, parameters);
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteInterest(Guid interestId)
        {
            var returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM INTERESTS
                        Output Deleted.Id
                        WHERE Id = @Id";
            var result = db.Query<Guid>(sql, new { Id = interestId });
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal int DeleteInterestsByPartnerId(Guid partnerId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM INTERESTS
                        Output Deleted.Id
                        WHERE ExchangePartnerId = @Id";
            var result = db.Query<Guid>(sql, new { Id = partnerId });
            return result.Count();
        }
    }
}
