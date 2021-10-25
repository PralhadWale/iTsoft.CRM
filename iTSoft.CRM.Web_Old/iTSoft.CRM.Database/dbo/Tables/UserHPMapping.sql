CREATE TABLE [dbo].[UserHPMapping] (
    [UserHpMappingId]        BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentSubmissionId] BIGINT   NULL,
    [UserFinancialId]        BIGINT   NULL,
    [HpId]                   BIGINT   NULL,
    [IsActive]               BIT      NULL,
    [CreatedBy]              BIGINT   NULL,
    [CreatedDate]            DATETIME NULL,
    [UpdatedBy]              BIGINT   NULL,
    [UpdatedDate]            DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserHpMappingId] ASC),
    FOREIGN KEY ([HpId]) REFERENCES [dbo].[HP] ([HpId]),
    FOREIGN KEY ([InvestmentSubmissionId]) REFERENCES [dbo].[InvestmentSubmissionDetails] ([InvestmentSubmissionId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



