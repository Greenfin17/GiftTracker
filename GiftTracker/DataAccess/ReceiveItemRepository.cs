using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class ReceiveItemRepository
    {
        readonly string _connectionString;

        public ReceiveItemRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<ReceiveItem> GetAllReceiveItems()
        {
            using var db = new SqlConnection(_connectionString);

            var receiveItems = db.Query<ReceiveItem>("SELECT * FROM ReceiveItems");
            return receiveItems;
        }

        internal ReceiveItem GetReceiveItemsById(Guid id)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM ReceiveItems
                        WHERE Id = @Id";

            var result = db.QueryFirstOrDefault<ReceiveItem>(sql, new { Id = id });
            return result;
        }

        internal IEnumerable<ReceiveItem> GetReceiveItemsByRecipientId(Guid recipId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT RI.Id, OccasionId, GiverId, ItemNameDescription, ItemURL, Remarks, Thanked FROM ReceiveItems RI
                        JOIN Occasions OC 
                    	ON RI.OccasionId = OC.ID
                        JOIN Users US on OccasionCreatorId = US.Id
                        WHERE US.Id = @RecipId";
            var parameter = new
            {
                RecipId = recipId
            };

            var result = db.Query<ReceiveItem>(sql, parameter);
            return result;
        }

        internal IEnumerable<ReceiveItemWithDetail> GetReceiveItemsWithDetailByOccasionId(Guid occasionId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT RI.Id, OccasionId, GiverId, EP.FirstName as GiverFirstName, EP.LastName as GiverLastName,
                        ItemName, ItemDescription, ItemURL, Remarks, Thanked FROM ReceiveItems RI
                        JOIN ExchangePartners EP on GiverId = EP.Id
                        WHERE OccasionId = @OccasionId";

            var parameters = new
            {
                OccasionId = occasionId
            };
            var result = db.Query<ReceiveItemWithDetail>(sql, parameters);
            return result;
        }

        internal IEnumerable<ReceiveItem> GetReceiveItemsByOccasionAndReceipientId( Guid recipId, Guid occasionId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT RI.Id, OccasionId, GiverId, ItemName, ItemDescription, ItemURL, Remarks, Thanked FROM ReceiveItems RI
                        JOIN Occasions OC 
                    	ON RI.OccasionId = OC.ID
                        JOIN Users US on OccasionCreatorId = US.Id
                        WHERE US.Id = @RecipId AND OC.Id = @OccasionId";

            var parameters = new
            {
                RecipId = recipId,
                OccasionId = occasionId
            };
            var result = db.Query<ReceiveItem>(sql, parameters);
            return result;
        }
        internal IEnumerable<ReceiveItem> GetReceiveItemsBySenderAndReceipientId( Guid recipId, Guid giverId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT RI.Id, OccasionId, GiverId, ItemName, ItemDescription, ItemURL, Remarks, Thanked FROM ReceiveItems RI
                        JOIN Occasions OC 
                    	ON RI.OccasionId = OC.ID
                        JOIN Users US on OccasionCreatorId = US.Id
                        WHERE US.Id = @RecipId AND RI.GiverId = @GiverId";
            var parameters = new
            {
                RecipId = recipId,
                GiverId = giverId
            };
            var result = db.Query<ReceiveItem>(sql, parameters);
            return result;
        }

        internal Guid AddReceiveItem(ReceiveItem itemObj)
        {
            Guid id = new();
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO ReceiveItems(OccasionId, GiverId, ItemName, ItemDescription, ItemURL, Remarks, Thanked)
                        OUTPUT Inserted.Id
                        VALUES(@OccasionId, @GiverId, @ItemName, @ItemDescription, @ItemURL, @Remarks, @Thanked)";
            id = db.ExecuteScalar<Guid>(sql, itemObj);
            return id;
        }

        internal bool UpdatedReceiveItem(Guid itemId, ReceiveItem itemObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE ReceiveItems
                        SET OccasionId = @OccasionId,
                            GiverId = @GiverId,
                            ItemName = @ItemName,
                            ItemDescription = @ItemDescription,
                            ItemURL = @ItemURL,
                            Remarks = @Remarks,
                            Thanked = @Thanked
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = itemId,
                itemObj.OccasionId,
                itemObj.GiverId,
                itemObj.ItemName,
                itemObj.ItemDescription,
                itemObj.ItemURL,
                itemObj.Remarks,
                itemObj.Thanked
            };
            var result = db.Query<ReceiveItem>(sql, parameters);
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteReceiveItem(Guid itemId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE from ReceiveItems
                        OUTPUT Deleted.Id
                        WHERE Id = @Id";
            var result = db.Query<Guid>(sql, new { Id = itemId });
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }
    }
}
