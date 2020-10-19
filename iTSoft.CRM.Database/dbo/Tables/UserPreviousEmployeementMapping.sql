CREATE TABLE [dbo].[UserPreviousEmployeementMapping] (
    [UserPreviousEmployeementId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [InvestmentSubmissionId]     BIGINT   NULL,
    [UserFinancialId]            BIGINT   NULL,
    [PreviousEmployeementId]     BIGINT   NULL,
    [IsActive]                   BIT      NULL,
    [CreatedBy]                  BIGINT   NULL,
    [CreatedDate]                DATETIME NULL,
    [UpdatedBy]                  BIGINT   NULL,
    [UpdatedDate]                DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserPreviousEmployeementId] ASC),
    FOREIGN KEY ([InvestmentSubmissionId]) REFERENCES [dbo].[InvestmentSubmissionDetails] ([InvestmentSubmissionId]),
    FOREIGN KEY ([PreviousEmployeementId]) REFERENCES [dbo].[PreviousEmployeementDetails] ([PreviousEmployeementId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



