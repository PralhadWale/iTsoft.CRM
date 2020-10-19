CREATE TABLE [dbo].[HRA] (
    [HraId]           BIGINT          IDENTITY (1, 1) NOT NULL,
    [LandlordName]    VARCHAR (100)   NULL,
    [LandlordAddress] VARCHAR (500)   NULL,
    [City]            VARCHAR (100)   NULL,
    [IsMetro]         VARCHAR (100)   NULL,
    [EnteredRent]     DECIMAL (18, 2) NULL,
    [AcceptedRent]    DECIMAL (18, 2) NULL,
    [StartDate]       DECIMAL (18, 2) NULL,
    [EndDate]         DECIMAL (18, 2) NULL,
    [LandlordPAN]     VARCHAR (10)    NULL,
    [IsActive]        BIT             NULL,
    [CreatedBy]       BIGINT          NULL,
    [CreatedDate]     DATETIME        NULL,
    [UpdatedBy]       BIGINT          NULL,
    [UpdatedDate]     DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([HraId] ASC)
);



