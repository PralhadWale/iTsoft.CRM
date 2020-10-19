CREATE TABLE [dbo].[DepartmentDetails] (
    [DepartmentId] BIGINT        IDENTITY (1, 1) NOT NULL,
    [Name]         VARCHAR (100) NULL,
    [Code]         VARCHAR (20)  NULL,
    [CompanyId]    BIGINT        NULL,
    [IsActive]     BIT           NULL,
    [CreatedBy]    BIGINT        NULL,
    [CreatedDate]  DATETIME      NULL,
    [UpdatedBy]    BIGINT        NULL,
    [UpdatedDate]  DATETIME      NULL,
    PRIMARY KEY CLUSTERED ([DepartmentId] ASC),
    FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[CompanyDetails] ([CompanyId])
);



