﻿using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class GiveItemRepository
    {
        readonly string _connectionString;
        public GiveItemRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<GiveItem> GetAllGiveItems()
        {
            var db = new SqlConnection(_connectionString);
            var result = db.Query<GiveItem>(@"SELECT * FROM GiveItems");
            return result;
        }

        internal GiveItem GetGiveItemById(Guid itemId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM GiveItems
                        WHERE Id = @Id";
            var result = db.QueryFirstOrDefault<GiveItem>(sql, new { Id = itemId });
            return result;
        }

        internal IEnumerable<GiveItemWithDetail> GetGiveItemsByRecipientAndOccasion(Guid recipientId, Guid occasionId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT GI.Id, GI.OccasionId, GI.RecipientId, GI.WishListItemId,
	                    GI.ItemName, GI.ItemDescription, GI.MerchantItemURL, GI.Price,
	                    GI.Purchased, GI.Wrapped, GI.Shipped, GI.Reaction,
	                    EP.FirstName as RecipientFirstName, EP.LastName as RecipientLastName FROM  GiveItems GI 
                        JOIN ExchangePartners EP
                        ON GI.RecipientId = EP.id
                        WHERE RecipientId = @RecipientId AND OccasionId = @OccasionId";
            var parameters = new
            {
                RecipientId = recipientId,
                OccasionId = occasionId
            };
            var result = db.Query<GiveItemWithDetail>(sql, parameters);
            return result;
        }

        internal IEnumerable<GiveItem> GetGiveItemsByOccasion(Guid occasionId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM GiveItems
                        WHERE OccasionId = @OccasionId";
            var parameter = new
            {
                OccasionId = occasionId
            };
            var result = db.Query<GiveItem>(sql, parameter);
            return result;
        }
        internal IEnumerable<GiveItemWithDetail> GetGiveItemsWithDetailByOccasion(Guid occasionId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT GI.Id, GI.OccasionId, GI.RecipientId, GI.WishListItemId,
	                    GI.ItemName, GI.ItemDescription, GI.MerchantItemURL, GI.Price,
	                    GI.Purchased, GI.Wrapped, GI.Shipped, GI.Reaction,
	                    EP.FirstName as RecipientFirstName, EP.LastName as RecipientLastName FROM  GiveItems GI 
                        JOIN ExchangePartners EP
                        ON GI.RecipientId = EP.id
                        WHERE OccasionId = @OccasionId";
            var parameter = new
            {
                OccasionId = occasionId
            };
            var result = db.Query<GiveItemWithDetail>(sql, parameter);
            return result;
        }
        internal IEnumerable<GiveItem> GetGiveItemsByRecipient(Guid recipientId)
        {
            var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM GiveItems
                        WHERE RecipientId = @RecipientId";
            var parameter = new
            {
                RecipientId = recipientId
            };
            var result = db.Query<GiveItem>(sql, parameter);
            return result;
        }

        internal Guid AddGiveItem(GiveItem itemObj)
        {
            Guid id = new();
            var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO GiveItems (OccasionId, RecipientId, WishListItemId, ItemName, ItemDescription, MerchantItemURL, Price, Purchased, Wrapped, Shipped, Reaction)
                        OUTPUT Inserted.id
                        VALUES (@OccasionId,
                                @RecipientId,
                                @WishListItemId,
                                @ItemName,
                                @ItemDescription,
                                @MerchantItemURL,
                                @Price,
                                @Purchased,
                                @Wrapped,
                                @Shipped,
                                @Reaction)";
            id = db.ExecuteScalar<Guid>(sql, itemObj);
            return id;
        }

        internal bool UpdateGiveItem(Guid itemId, GiveItem itemObj)
        {
            bool returnVal = false;
            var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE GiveItems
                        SET Id = @ID,
                            OccasionId = @OccasionID,
                            RecipientId = @RecipientId,
                            WishListItemId = @WishListItemId,
                            ItemName = @ItemName,
                            ItemDescription = @ItemDescription,
                            MerchantItemURL = @MerchantItemURL,
                            Price = @Price,
                            Purchased = @Purchased,
                            Wrapped = @Wrapped,
                            Shipped = @Shipped,
                            Reaction = @Reaction
                        OUTPUT Inserted.*
                        WHERE Id = @ID";
            var parameters = new
            {
                Id = itemId,
                itemObj.OccasionId,
                itemObj.RecipientId,
                itemObj.WishListItemId,
                itemObj.ItemName,
                itemObj.ItemDescription,
                itemObj.MerchantItemURL,
                itemObj.Price,
                itemObj.Purchased,
                itemObj.Wrapped,
                itemObj.Shipped,
                itemObj.Reaction
            };
            var result = db.Query<GiveItem>(sql, parameters);
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteGiveItem(Guid itemId)
        {
            var returnVal = false;
            var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM GiveItems
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
