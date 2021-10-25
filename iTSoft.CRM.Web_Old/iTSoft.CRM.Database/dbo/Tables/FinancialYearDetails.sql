CREATE TABLE [dbo].[FinancialYearDetails] (
    [FinancialYearId] BIGINT       IDENTITY (1, 1) NOT NULL,
    [FinancialYear]   VARCHAR (10) NOT NULL,
    [DisplayYear]     VARCHAR (50) NOT NULL,
    [IsActive]        BIT          NULL,
    [CreatedBy]       BIGINT       NULL,
    [CreatedDate]     DATETIME     NULL,
    [UpdatedBy]       BIGINT       NULL,
    [UpdatedDate]     DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([FinancialYearId] ASC)
);



