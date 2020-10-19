CREATE TABLE [dbo].[UserLTAMapping] (
    [UserLtaMappingId]       BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentSubmissionId] BIGINT   NULL,
    [UserFinancialId]        BIGINT   NULL,
    [LtaId]                  BIGINT   NULL,
    [IsActive]               BIT      NULL,
    [CreatedBy]              BIGINT   NULL,
    [CreatedDate]            DATETIME NULL,
    [UpdatedBy]              BIGINT   NULL,
    [UpdatedDate]            DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserLtaMappingId] ASC),
    FOREIGN KEY ([InvestmentSubmissionId]) REFERENCES [dbo].[InvestmentSubmissionDetails] ([InvestmentSubmissionId]),
    FOREIGN KEY ([LtaId]) REFERENCES [dbo].[LTA] ([LtaId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



