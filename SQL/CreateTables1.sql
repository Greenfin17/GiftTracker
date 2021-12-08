CREATE TABLE dbo.Users
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	FireBaseUID uniqueidentifier,
	FirstName varchar(50),
	LastName varchar(50),
	EmailAddress varchar(100),
	ImageURL varchar(500),	
)

CREATE TABLE dbo.ExchangePartners
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	CreatedById uniqueidentifier NOT NULL,
	FirstName varchar(50),
	LastName varchar(50),
	EmailAddress varchar(60),
	ImageURL varchar(500),
	Birthday date,
	Street varchar(50),
	City varchar(30),
	PostalState varchar(2),
	Zip varchar (11),
	Colors varchar (50),
	Sizes varchar(50)
	CONSTRAINT FK_ExchangePartners_Users FOREIGN KEY (CreatedById)
		REFERENCES dbo.Users (Id)
)

CREATE TABLE dbo.Interests
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	ExchangePartnerId uniqueidentifier NOT NULL,
	Description varchar(300)
	CONSTRAINT FK_Interests_ExchangePartners FOREIGN KEY (ExchangePartnerId)
		REFERENCES dbo.ExchangePartners (Id)
)

CREATE TABLE dbo.Occasions
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	OccasionCreatorId uniqueidentifier NOT NULL,
	OccasionName varchar(50),
	OccasionDate date,
	OccasionLocation varchar(100),
	Budget decimal
	CONSTRAINT FK_Occasions_Users FOREIGN KEY (OccasionCreatorId)
		REFERENCES dbo.Users (Id)
)

CREATE TABLE dbo.WishListItems
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	OccasionId uniqueidentifier NOT NULL,
	OwnerId uniqueidentifier NOT NULL,
	Description varchar(300),
	ItemURL varchar(800)
	CONSTRAINT FK_WishListItems_Occasions FOREIGN KEY (OccasionId)
		REFERENCES dbo.Occasions (Id),
	CONSTRAINT FK_WishListItems_Users FOREIGN KEY (OwnerId)
		REFERENCES dbo.Users (Id)
)

CREATE TABLE ReceiveItems
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	OccasionId uniqueidentifier NOT NULL,
	GiverId uniqueidentifier NOT NULL,
	Description varchar(300),
	ItemURL varchar(800),
	Remarks varchar(300),
	Thanked bit,
	CONSTRAINT FK_ReceiveItems_Occasions FOREIGN KEY (OccasionId)
		REFERENCES dbo.Occasions (Id),
	CONSTRAINT FK_ReceiveItems_ExchangePartners FOREIGN KEY (GiverId)
		REFERENCES dbo.Users (Id)
)

CREATE TABLE GiveItems
(
	Id uniqueidentifier NOT NULL Primary Key default(newid()),
	OccasionId uniqueidentifier NOT NULL,
	RecipientId uniqueidentifier NOT NULL,
	WishListItemId uniqueidentifier,
	Description varchar(300),
	MerchantItemURL varchar(800),
	Price decimal,
	Purchased bit,
	Wrapped bit,
	Shipped bit,
	Reaction varchar(300)
	CONSTRAINT FK_GiveItems_Occasions FOREIGN KEY (OccasionId)
		REFERENCES dbo.Occasions (Id),
	CONSTRAINT FK_GiveItems_ExchangePartners FOREIGN KEY (RecipientId)
		REFERENCES dbo.ExchangePartners (Id),
	CONSTRAINT FK_GiveItems_WishListItems FOREIGN KEY (WishListItemId)
		REFERENCES dbo.WishListItems (Id)
)


	