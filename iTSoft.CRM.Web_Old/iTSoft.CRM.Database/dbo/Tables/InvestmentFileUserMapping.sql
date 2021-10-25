CREATE TABLE [dbo].[InvestmentFileUserMapping] (
    [InvestmentFileUserMappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [UserFinancialId]             BIGINT   NULL,
    [FileId]                      BIGINT   NULL,
    [InvestmentSubmissionId]      BIGINT   NULL,
    [InvestmentCycleTypeId]       BIGINT   NULL,
    [IsActive]                    BIT      NULL,
    [CreatedBy]                   BIGINT   NULL,
    [CreatedDate]                 DATETIME NULL,
    [UpdatedBy]                   BIGINT   NULL,
    [UpdatedDate]                 DATETIME NULL,
    [InvestmentCycleId]           BIGINT   NULL,
    [CompanyFinancialId]          BIGINT   NULL,
    PRIMARY KEY CLUSTERED ([InvestmentFileUserMappingId] ASC),
    FOREIGN KEY ([CompanyFinancialId]) REFERENCES [dbo].[CompanyFinancialMapping] ([CompanyFinancialId]),
    FOREIGN KEY ([FileId]) REFERENCES [dbo].[FileDetails] ([FileId]),
    FOREIGN KEY ([InvestmentCycleId]) REFERENCES [dbo].[InvestmentCycleDetails] ([InvestmentCycleId]),
    FOREIGN KEY ([InvestmentCycleTypeId]) REFERENCES [dbo].[TypeOfInvestmentCycle] ([InvestmentCycleTypeId]),
    FOREIGN KEY ([InvestmentSubmissionId]) REFERENCES [dbo].[InvestmentSubmissionDetails] ([InvestmentSubmissionId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);





