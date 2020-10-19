CREATE TABLE [dbo].[FinancialDetails] (
    [FinancialDetailsId]  BIGINT          IDENTITY (1, 1) NOT NULL,
    [Salary]              DECIMAL (18, 2) NULL,
    [BasicSalary]         DECIMAL (18, 2) NULL,
    [Da]                  DECIMAL (18, 2) NULL,
    [OtherPerquisites]    DECIMAL (18, 2) NULL,
    [Hra]                 DECIMAL (18, 2) NULL,
    [Lta]                 DECIMAL (18, 2) NULL,
    [DailyAllowance]      DECIMAL (18, 2) NULL,
    [TravelAllowance]     DECIMAL (18, 2) NULL,
    [ConveyanceAllowance] DECIMAL (18, 2) NULL,
    [TotalEarning]        DECIMAL (18, 2) NULL,
    [ProfessionalTax]     DECIMAL (18, 2) NULL,
    [MedicalInsurance]    DECIMAL (18, 2) NULL,
    [EmployeePF]          DECIMAL (18, 2) NULL,
    [Gratuity]            DECIMAL (18, 2) NULL,
    [IsActive]            BIT             NULL,
    [CreatedBy]           BIGINT          NULL,
    [CreatedDate]         DATETIME        NULL,
    [UpdatedBy]           BIGINT          NULL,
    [UpdatedDate]         DATETIME        NULL,
    PRIMARY KEY CLUSTERED ([FinancialDetailsId] ASC)
);



