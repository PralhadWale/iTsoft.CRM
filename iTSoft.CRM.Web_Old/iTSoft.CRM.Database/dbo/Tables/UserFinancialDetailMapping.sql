CREATE TABLE [dbo].[UserFinancialDetailMapping] (
    [UserFinancialDetailMappingId] BIGINT   IDENTITY (1, 1) NOT NULL,
    [FinancialDetailsId]           BIGINT   NULL,
    [UserFinancialId]              BIGINT   NULL,
    [IsActive]                     BIT      NULL,
    [CreatedBy]                    BIGINT   NULL,
    [CreatedDate]                  DATETIME NULL,
    [UpdatedBy]                    BIGINT   NULL,
    [UpdatedDate]                  DATETIME NULL,
    PRIMARY KEY CLUSTERED ([UserFinancialDetailMappingId] ASC),
    FOREIGN KEY ([FinancialDetailsId]) REFERENCES [dbo].[FinancialDetails] ([FinancialDetailsId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



