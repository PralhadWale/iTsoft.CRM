CREATE TABLE [dbo].[TypeOfInvestmentCycle] (
    [InvestmentCycleTypeId] BIGINT       IDENTITY (1, 1) NOT NULL,
    [Code]                  VARCHAR (10) NOT NULL,
    [Name]                  VARCHAR (50) NULL,
    [IsActive]              BIT          NULL,
    [CreatedBy]             BIGINT       NULL,
    [CreatedDate]           DATETIME     NULL,
    [UpdatedBy]             BIGINT       NULL,
    [UpdatedDate]           DATETIME     NULL,
    PRIMARY KEY CLUSTERED ([InvestmentCycleTypeId] ASC)
);



