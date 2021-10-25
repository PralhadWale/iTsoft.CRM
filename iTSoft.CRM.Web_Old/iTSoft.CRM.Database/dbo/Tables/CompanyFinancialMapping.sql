CREATE TABLE [dbo].[CompanyFinancialMapping] (
    [CompanyFinancialId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [CompanyId]          BIGINT   NULL,
    [FinancialYearId]    BIGINT   NULL,
    [IsActive]           BIT      NULL,
    [CreatedBy]          BIGINT   NULL,
    [CreatedDate]        DATETIME NULL,
    [UpdatedBy]          BIGINT   NULL,
    [UpdatedDate]        DATETIME NULL,
    [IsCurrent]          BIT      NULL,
    PRIMARY KEY CLUSTERED ([CompanyFinancialId] ASC),
    FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[CompanyDetails] ([CompanyId]),
    FOREIGN KEY ([FinancialYearId]) REFERENCES [dbo].[FinancialYearDetails] ([FinancialYearId])
);





