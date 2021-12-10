INSERT INTO Users (FirstName, LastName, EmailAddress, ImageURL)
	VALUES ('John', 'Maple', 'jm@example.com', 'https://lh3.googleusercontent.com/ogw/ADea4I6GAr2cGlYwYJcMMnzuDKYC02NXtgl1_itqo7IncA=s83-c-mo');

INSERT INTO ExchangePartners 
	( CreatedById, FirstName, LastName, EmailAddress, ImageURL, Birthday, Street, City, PostalState, Zip,
		Colors, Sizes)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Maple') , 'Andrew', 'Walton', 'aw@example.com', 'https://storage.googleapis.com/gift_tracker_images/Avatars/A.png',
		'1992-01-01', '1234 Somewhere', 'Fine City', 'AZ', '12345', 'Unknown', '32 Waist, 32-33 Inseam');
INSERT INTO ExchangePartners 
	( CreatedById, FirstName, LastName, EmailAddress, ImageURL, Birthday, Street, City, PostalState, Zip,
		Colors, Sizes)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Maple') , 'Kay', 'Walton', 'kw@example.com', 'https://storage.googleapis.com/gift_tracker_images/Avatars/K.png',
		'1970-01-01', '1234 SomewhereElse', 'Another Fine City', 'AL', '54321', 'Unknown', 'Small');
INSERT INTO Occasions ( OccasionCreatorId, OccasionName, OccasionDate, OccasionBudget)
VALUES ((Select Id from Users where FirstName = 'John' AND LastName = 'Maple'), 'Christmas', '12-25-2021', '500.00');

