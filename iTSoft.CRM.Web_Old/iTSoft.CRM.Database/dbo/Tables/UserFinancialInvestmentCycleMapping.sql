CREATE TABLE [dbo].[UserFinancialInvestmentCycleMapping] (
    [UserFinancialId]    BIGINT   IDENTITY (1, 1) NOT NULL,
    [UserId]             BIGINT   NULL,
    [CompanyFinancialId] BIGINT   NULL,
    [IsActive]           BIT      NULL,
    [CreatedBy]          BIGINT   NULL,
    [CreatedDate]        DATETIME NULL,
    [UpdatedBy]          BIGINT   NULL,
    [UpdatedDate]        DATETIME NULL,
    [CompanyId]          BIGINT   NULL,
    PRIMARY KEY CLUSTERED ([UserFinancialId] ASC),
    FOREIGN KEY ([CompanyFinancialId]) REFERENCES [dbo].[CompanyFinancialMapping] ([CompanyFinancialId]),
    FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[CompanyDetails] ([CompanyId]),
    FOREIGN KEY ([UserId]) REFERENCES [dbo].[UserDetails] ([UserId])
);





