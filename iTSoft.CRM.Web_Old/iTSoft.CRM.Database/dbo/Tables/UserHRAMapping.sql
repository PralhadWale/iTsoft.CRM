CREATE TABLE [dbo].[UserHRAMapping] (
    [UserHraMappingId]       BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentSubmissionId] BIGINT   NULL,
    [UserFinancialId]        BIGINT   NULL,
    [Hraid]                  BIGINT   NULL,
    [IsActive]               BIT      NULL,
    [CreatedBy]              BIGINT   NULL,
    [CreatedDate]            DATETIME NULL,
    [UpdatedBy]              BIGINT   NULL,
    [UpdatedDate]            DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserHraMappingId] ASC),
    FOREIGN KEY ([Hraid]) REFERENCES [dbo].[HRA] ([HraId]),
    FOREIGN KEY ([InvestmentSubmissionId]) REFERENCES [dbo].[InvestmentSubmissionDetails] ([InvestmentSubmissionId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



