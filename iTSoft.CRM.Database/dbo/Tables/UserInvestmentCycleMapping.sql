CREATE TABLE [dbo].[UserInvestmentCycleMapping] (
    [UserInvestMentmappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentCycleId]       BIGINT   NULL,
    [CompanyFinancialId]      BIGINT   NULL,
    [InvestmentCycletypeId]   BIGINT   NULL,
    [IsActive]                BIT      NULL,
    [CreatedBy]               BIGINT   NULL,
    [CreatedDate]             DATETIME NULL,
    [UpdatedBy]               BIGINT   NULL,
    [UpdatedDate]             DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserInvestMentmappingId] ASC),
    FOREIGN KEY ([CompanyFinancialId]) REFERENCES [dbo].[CompanyFinancialMapping] ([CompanyFinancialId]),
    FOREIGN KEY ([InvestmentCycleId]) REFERENCES [dbo].[InvestmentCycleDetails] ([InvestmentCycleId]),
    FOREIGN KEY ([InvestmentCycletypeId]) REFERENCES [dbo].[TypeOfInvestmentCycle] ([InvestmentCycleTypeId])
);



