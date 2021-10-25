CREATE TABLE [dbo].[InvestmentCycleDetails] (
    [InvestmentCycleId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [Code]              VARCHAR (10)  NOT NULL,
    [DisplayName]       VARCHAR (100) NULL,
    [StartDate]         DATETIME      NOT NULL,
    [EndDate]           DATETIME      NOT NULL,
    [IsActive]          BIT           NULL,
    [CreatedBy]         BIGINT        NULL,
    [CreatedDate]       DATETIME      NULL,
    [UpdatedBy]         BIGINT        NULL,
    [UpdatedDate]       DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([InvestmentCycleId] ASC)
);





