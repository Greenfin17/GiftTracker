INSERT INTO Users (FirstName, LastName, EmailAddress, ProfilePicURL)
	VALUES ('John', 'Greenfin', 'jg@example.com', 'https://lh3.googleusercontent.com/ogw/ADea4I6GAr2cGlYwYJcMMnzuDKYC02NXtgl1_itqo7IncA=s83-c-mo');

INSERT INTO ExchangePartners 
	( CreatedById, FirstName, LastName, EmailAddress, ImageURL, Birthday, Street, City, PostalState, Zip,
		Colors, Sizes)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Greenfin') , 'Andrew', 'Walton', 'aw@example.com', 'https://storage.googleapis.com/gift_tracker_images/Avatars/A.png',
		'1992-01-01', '1234 Somewhere', 'Fine City', 'AZ', '12345', 'Unknown', '32 Waist, 32-33 Inseam');

INSERT INTO ExchangePartners 
	( CreatedById, FirstName, LastName, EmailAddress, ImageURL, Birthday, Street, City, PostalState, Zip,
		Colors, Sizes)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Greenfin') , 'Kay', 'Walton', 'kw@example.com', 'https://storage.googleapis.com/gift_tracker_images/Avatars/K.png',
		'1970-01-01', '1234 SomewhereElse', 'Another Fine City', 'AL', '54321', 'Unknown', 'Small');

INSERT INTO Occasions ( OccasionCreatorId, OccasionName, OccasionDate, OccasionBudget)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Greenfin'), 'Christmas', '12-25-2021', '500.00');

INSERT INTO WishListItems ( OccasionId, OwnerId, Description, ItemURL )
VALUES ((SELECT Id FROM Occasions WHERE OccasionDate = '12-25-2021'), (SELECT Id FROM ExchangePartners WHERE FirstName = 'Andrew' AND LastName = 'Walton'),
		'Any film on Blu Ray or DVD from this site: https://www.zipporah.com/', 'https://www.zipporah.com/');

INSERT INTO WishListItems ( OccasionId, OwnerId, Description, ItemURL )
VALUES ((SELECT Id FROM Occasions WHERE OccasionDate = '12-25-2021'), (SELECT Id FROM ExchangePartners WHERE FirstName = 'Andrew' AND LastName = 'Walton'),
		'Anything to do with cooking, spices, recipes or book written by a chef', '');

INSERT INTO WishListItems ( OccasionId, OwnerId, Description, ItemURL )
VALUES ((SELECT Id FROM Occasions WHERE OccasionDate = '12-25-2021'), (SELECT Id FROM ExchangePartners WHERE FirstName = 'Andrew' AND LastName = 'Walton'),
		'Golf shorts (not too long over the knee... Target sells good ones), black jeans or dark chinos, 32 waist. length 30-32. Tapered or slim', '');


