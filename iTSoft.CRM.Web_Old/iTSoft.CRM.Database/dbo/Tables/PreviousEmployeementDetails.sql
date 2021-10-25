CREATE TABLE [dbo].[PreviousEmployeementDetails] (
    [PreviousEmployeementId] BIGINT          IDENTITY (1, 1) NOT NULL,
    [EmployerName]           VARCHAR (100)   NULL,
    [Address]                VARCHAR (500)   NULL,
    [EmployeementStartDate]  DATETIME        NULL,
    [EmployeementEndDate]    DATETIME        NULL,
    [TotalSalary]            DECIMAL (18, 2) NULL,
    [PaidTaxAmount]          DECIMAL (18, 2) NULL,
    [IsActive]               BIT             NULL,
    [CreatedBy]              BIGINT          NULL,
    [CreatedDate]            DATETIME        NULL,
    [UpdatedBy]              BIGINT          NULL,
    [UpdatedDate]            DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([PreviousEmployeementId] ASC)
);



