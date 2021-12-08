using System.Collections.Generic;
using System;
// using System.Linq;
// using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using GiftTracker.Models;

namespace GiftTracker.DataAccess
{
    public class UserRepository
    {
        readonly string _connectionString;

        public UserRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("GiftTracker");
        }

        internal IEnumerable<User> GetAll()
        {
            using var db = new SqlConnection(_connectionString);

            var users = db.Query<User>(@"Select * From Users");
            return users;
        }

        internal User GetUserById(Guid UserId)
        {
            using var db = new SqlConnection(_connectionString);
            var sql = @"SELECT * from Users
                        WHERE ID = @Id";
            var parameter = new
            {
                Id = UserId 
            };

            var result = db.QueryFirstOrDefault<User>(sql, parameter);
            return result;
        }
    }
}
