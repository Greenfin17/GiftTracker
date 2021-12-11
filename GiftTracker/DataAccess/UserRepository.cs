using System.Collections.Generic;
using System;
using System.Linq;
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

            var users = db.Query<User>(@"SELECT * From Users");
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

        internal Guid AddUser(User userObj)
        {
            using var db = new SqlConnection(_connectionString);
            Guid id = new Guid();
            var sql = @"INSERT INTO Users (FireBaseUID, FirstName, LastName, EmailAddress, ProfilePicURL)
                        OUTPUT Inserted.Id
                        VALUES
                       (@FirebaseUID, @FirstName, @LastName, @EmailAddress, @ProfilePicURL)";
            id = db.ExecuteScalar<Guid>(sql, userObj);
            if (!id.Equals(Guid.Empty))
            {
                userObj.Id = id;
            }
            return id;
        }

        internal bool UpdateUser(Guid userId, User userObj)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"UPDATE Users
                            SET Id = @Id,
                            FirebaseUID = @FirebaseUID,
                            FirstName = @FirstName,
                            LastName = @LastName,
                            EmailAddress = @EmailAddress,
                            ProfilePicURL = @ProfilePicURL
                        OUTPUT Inserted.*
                        WHERE Id = @Id";
            var parameters = new
            {
                Id = userId,
                FirebaseUID = userObj.FirebaseUID,
                FirstName = userObj.FirstName,
                LastName = userObj.LastName,
                EmailAddress = userObj.EmailAddress,
                ProfilePicURL = userObj.ProfilePicUrl
            };

            var result = db.Query<User>(sql, parameters);
            if (result.Count() > 0 )
            {
                returnVal = true;
            }
            return returnVal;
        }

        internal bool DeleteUser(Guid userId)
        {
            bool returnVal = false;
            using var db = new SqlConnection(_connectionString);
            var sql = @"DELETE from Users 
                        WHERE Id = @Id";
            var parameter = new
            {
                Id = userId
            };
            var result = db.Query(sql, parameter);
            if (result.Count() > 0)
            {
                returnVal = true;
            }
            return returnVal;
        }
    }
}
