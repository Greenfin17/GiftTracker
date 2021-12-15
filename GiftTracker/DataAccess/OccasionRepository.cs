using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class OccasionRepository
    {
        readonly string _connectionString;

        public OccasionRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<Occasion> GetAllOccasions()
        {
            using var db = new SqlConnection(_connectionString);

            var occasions = db.Query<Occasion>(@"SELECT * FROM Occasions");
            return occasions;
        }

        internal Occasion GetOccasionById(Guid occasionId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Occasions
                        WHERE Id = @Id";
            var result = db.QueryFirstOrDefault<Occasion>(sql, new { Id = occasionId } );
            return result;
        }

        internal bool OccasionExists(Guid occasionId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Occasions
                        WHERE Id = @Id";
            var result = db.QueryFirstOrDefault<Occasion>(sql, new { Id = occasionId } );
            if (result != null)
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal IEnumerable<Occasion> GetOccasionsByCreatorId(Guid creatorId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * FROM Occasions
                         WHERE OccasionCreatorId = @OccasionCreatorId";
            var parameter = new
            {
                OccasionCreatorId = creatorId
            };
            var result = db.Query<Occasion>(sql, parameter);
            return result;
        }

        internal Guid AddOccasion(Occasion occasionObj)
        {
            Guid id = new();
            using var db = new SqlConnection(_connectionString);
            var sql = @"INSERT INTO Occasions (OccasionCreatorId, OccasionName, OccasionDate, OccasionLocation, OccasionBudget)
                        OUTPUT Inserted.*
                        VALUES (@OccasionCreatorId, @OccasionName, @OccasionDate, @OccasionLocation, @OccasionBudget)";

            id = db.ExecuteScalar<Guid>(sql, occasionObj);
            if (!id.Equals(Guid.Empty))
            {
                occasionObj.Id = id;
            }
            return id;
        }

        internal bool UpdateOccasion(Guid occasionId, Occasion occasionObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Occasions
                        SET Id = @id,
                            OccasionCreatorId = @OccasionCreatorId,
                            OccasionName = @OccasionName,
                            OccasionDate = @OccasionDate,
                            OccasionLocation = @OccasionLocation,
                            OccasionBudget = @OccasionBudget
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = occasionId,
                occasionObj.OccasionCreatorId,
                occasionObj.OccasionName,
                occasionObj.OccasionDate,
                occasionObj.OccasionLocation,
                occasionObj.OccasionBudget
            };

            var result = db.Query<Occasion>(sql, parameters);
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteOccasion(Guid occasionId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE FROM Occasions
                        OUTPUT Deleted.Id
                        WHERE Id = @Id";
            var result = db.Query<Guid>(sql, new { Id = occasionId });
            if (result.Any())
            {
                returnVal = true;
            }
            return returnVal;
        }
    }
}
