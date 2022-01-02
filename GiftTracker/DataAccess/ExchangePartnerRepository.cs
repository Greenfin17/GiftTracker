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

        internal IEnumerable<ExchangePartner> GetPartnersByCreatorId(Guid creatorId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM ExchangePartners
                        WHERE CreatedById = @CreatedById";
            var partnerList = db.Query<ExchangePartner>(sql, new { CreatedById = creatorId});
            return partnerList;
        }

        internal bool ExchangePartnerExists(Guid partnerId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM ExchangePartners
                        WHERE Id = @Id";
            var partnerObj = db.QueryFirstOrDefault<ExchangePartner>(sql, new { Id = partnerId });
            if (partnerObj != null)
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal Guid AddExchangePartner(ExchangePartner partnerObj)
        {
            using var db = new SqlConnection(_connectionString);
            var id = new Guid();
            var sql = @"INSERT INTO ExchangePartners (CreatedById, FirstName, LastName, EmailAddress, ImageURL, Birthday, Colors, Sizes)
                        OUTPUT Inserted.Id
                        VALUES 
                        (@CreatedById, @FirstName, @LastName, @EmailAddress, @ImageURL, @Birthday, @Colors, @Sizes)";
            id = db.ExecuteScalar<Guid>(sql, partnerObj);
            if (!id.Equals(Guid.Empty))
            {
                partnerObj.Id = id;
            }
            return id;
        }

        internal bool UpdateExchangePartner(Guid partnerId, ExchangePartner partnerObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE ExchangePartners
                        SET Id = @Id,
                        CreatedById = @CreatedById,
                        FirstName = @FirstName,
                        LastName = @LastName,
                        EmailAddress = @EmailAddress,
                        ImageUrl = @ImageURL,
                        Birthday = @Birthday,
                        Colors = @Colors,
                        Sizes = @Sizes
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = partnerId,
                CreatedById = partnerObj.CreatedById,
                FirstName = partnerObj.FirstName,
                LastName = partnerObj.LastName,
                EmailAddress = partnerObj.EmailAddress,
                ImageURL = partnerObj.ImageURL,
                Birthday = partnerObj.Birthday,
                Colors = partnerObj.Colors,
                Sizes = partnerObj.Sizes
            };

            var result = db.Query<ExchangePartner>(sql, parameters);
            if (result.Count() > 0 )
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeletePartner(Guid partnerId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM ExchangePartners
                        OUTPUT Deleted.Id
                        WHERE Id = @Id";
            var parameter = new
            {
                Id = partnerId
            };
            var result = db.Query(sql, parameter);
            if (result.Count() > 0)
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool PartnerHasData(Guid partnerId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT Id from ReceiveItems
                        WHERE GiverId = @exPartnerId";
            var parameter = new
            {
                exPartnerId = partnerId
            };
            var result = db.Query<Guid>(sql, parameter);
            if (result.Any())
            {
                returnVal = true;
            }
            if (!returnVal)
            {
                sql = @"SELECT Id from GiveItems
                        WHERE RecipientID = @exPartnerId";
                result = db.Query<Guid>(sql, parameter);
                if (result.Any())
                {
                    returnVal = true;
                }
            }
            if (!returnVal)
            {
                sql = @"SELECT Id from Interests 
                        WHERE ExchangePartnerId = @exPartnerId";
                result = db.Query<Guid>(sql, parameter);
                if (result.Any())
                {
                    returnVal = true;
                }
            }
            if (!returnVal)
            {
                sql = @"SELECT Id from WishListItems 
                        WHERE OwnerId = @exPartnerId";
                result = db.Query<Guid>(sql, parameter);
                if (result.Any())
                {
                    returnVal = true;
                }
            }
            return returnVal;
        }
    }
}
