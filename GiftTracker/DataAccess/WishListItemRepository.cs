using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class WishListItemRepository
    {
        readonly string _connectionString;
        public WishListItemRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<WishListItem> GetAllWishListItems()
        {
            using var db = new SqlConnection(_connectionString);
            var wishListItems = db.Query<WishListItem>(@"SELECT * FROM WishListItems");
            return wishListItems;
        }

        internal WishListItem GetWishListItemById(Guid itemId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM WishListItems
                        WHERE Id = @Id";
            var result = db.QueryFirstOrDefault<WishListItem>(sql, new { Id = itemId });
            return result;
        }

        internal IEnumerable<WishListItem> GetWishListItemsByOccasionAndOwner(Guid partnerId, Guid occasionId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM WishListItems
                        WHERE OwnerId = @OwnerId AND OccasionId = @OccasionId";
            var parameters = new
            {
                OwnerId = partnerId,
                OccasionId = occasionId
            };
            var result = db.Query<WishListItem>(sql, parameters);
            return result;
        }

        internal Guid AddWishListItem(WishListItem itemObj)
        {
            Guid id = new();
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO WishListItems (OccasionId, OwnerId, Description, ItemURL)
                        OUTPUT Inserted.Id
                        VALUES (@OccasionId, @OwnerId, @Description, @ItemURL)";
            id = db.ExecuteScalar<Guid>(sql, itemObj);
            return id;
        }

        internal bool UpdateWishListItem(Guid itemId, WishListItem itemObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE WishListItems
                        SET Id = @Id,
                            OccasionId = @OccasionId,
                            OwnerId = @OwnerId,
                            Description = @Description,
                            ItemURL = @ItemURL
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = itemId,
                itemObj.OccasionId,
                itemObj.OwnerId,
                itemObj.Description,
                itemObj.ItemURL
            };

            var result = db.Query<WishListItem>(sql, parameters);
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteWishListItem(Guid itemId)
        {
            var returnVal = false;
            var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM WishListItems
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
