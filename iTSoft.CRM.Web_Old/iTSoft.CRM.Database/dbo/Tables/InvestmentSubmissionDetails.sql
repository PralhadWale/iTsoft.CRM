CREATE TABLE [dbo].[InvestmentSubmissionDetails] (
    [InvestmentSubmissionId] BIGINT          IDENTITY (1, 1) NOT NULL,
    [EnteredAmount]          DECIMAL (18, 2) NULL,
    [UserComment]            VARCHAR (500)   NULL,
    [AcceptedAmount]         DECIMAL (18, 2) NULL,
    [IsAccepted]             VARCHAR (10)    NULL,
    [Reason]                 VARCHAR (500)   NULL,
    [IsActive]               BIT             NULL,
    [CreatedBy]              BIGINT          NULL,
    [CreatedDate]            DATETIME        NULL,
    [UpdatedBy]              BIGINT          NULL,
    [UpdatedDate]            DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([InvestmentSubmissionId] ASC)
);



