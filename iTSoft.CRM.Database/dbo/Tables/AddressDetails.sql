CREATE TABLE [dbo].[AddressDetails] (
    [AddressDetailsId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [Address]          VARCHAR (100) NULL,
    [Pincode]          VARCHAR (10)  NULL,
    [IsActive]         BIT           NULL,
    [CreatedBy]        BIGINT        NULL,
    [CreatedDate]      DATETIME      NULL,
    [UpdatedBy]        BIGINT        NULL,
    [UpdatedDate]      DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([AddressDetailsId] ASC)
);



