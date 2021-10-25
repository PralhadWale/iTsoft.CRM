CREATE TABLE [dbo].[AddressUserMapping] (
    [AddressUserMappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [AddressDetailsId]     BIGINT   NULL,
    [UserFinancialId]      BIGINT   NULL,
    [CityId]               BIGINT   NULL,
    [StateId]              BIGINT   NULL,
    [CountryId]            BIGINT   NULL,
    [IsActive]             BIT      NULL,
    [CreatedBy]            BIGINT   NULL,
    [CreatedDate]          DATETIME NULL,
    [UpdatedBy]            BIGINT   NULL,
    [UpdatedDate]          DATETIME NULL,
    PRIMARY KEY CLUSTERED ([AddressUserMappingId] ASC),
    FOREIGN KEY ([AddressDetailsId]) REFERENCES [dbo].[AddressDetails] ([AddressDetailsId]),
    FOREIGN KEY ([CityId]) REFERENCES [dbo].[CityDetail] ([CityId]),
    FOREIGN KEY ([CountryId]) REFERENCES [dbo].[CountryDetails] ([CountryId]),
    FOREIGN KEY ([StateId]) REFERENCES [dbo].[StateDetails] ([StateId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



