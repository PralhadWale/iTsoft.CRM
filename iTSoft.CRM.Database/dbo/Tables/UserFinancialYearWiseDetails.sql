CREATE TABLE [dbo].[UserFinancialYearWiseDetails] (
    [UserFinancialYearWiseDetailsId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [UserFinancialId]                BIGINT        NULL,
    [DepartmentId]                   BIGINT        NULL,
    [Address]                        VARCHAR (100) NULL,
    [Designation]                    VARCHAR (100) NULL,
    [DateOfJoin]                     DATETIME      NULL,
    [IsActive]                       BIT           NULL,
    [CreatedBy]                      BIGINT        NULL,
    [CreatedDate]                    DATETIME      NULL,
    [UpdatedBy]                      BIGINT        NULL,
    [UpdatedDate]                    DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([UserFinancialYearWiseDetailsId] ASC),
    FOREIGN KEY ([DepartmentId]) REFERENCES [dbo].[DepartmentDetails] ([DepartmentId]),
    FOREIGN KEY ([UserFinancialId]) REFERENCES [dbo].[UserFinancialInvestmentCycleMapping] ([UserFinancialId])
);



